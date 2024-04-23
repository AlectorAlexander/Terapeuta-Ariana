"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedules_entity_1 = require("../entities/schedules.entity");
const schedules_dtos_1 = require("./../dtos/schedules.dtos");
const notifications_service_1 = require("../../notifications/service/notifications.service");
const google_calendar_service_1 = require("../../booking/google-calendar/google-calendar.service");
const common_1 = require("@nestjs/common");
let SchedulesService = class SchedulesService {
    constructor(notificationService, googleCalendarService) {
        this.notificationService = notificationService;
        this.googleCalendarService = googleCalendarService;
        this._schedule = new schedules_entity_1.default();
    }
    async createAndSendNotification(data, action) {
        const { user_id, start_date, status } = data;
        const start_date_formatted = new Date(start_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        const start_time_formatted = new Date(start_date).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        });
        let message = '';
        if (action === 'created') {
            message = `Seu agendamento foi marcado para o dia ${start_date_formatted} às ${start_time_formatted}.`;
        }
        else if (action === 'cancelled') {
            message = `Seu agendamento para o dia ${start_date_formatted} às ${start_time_formatted} foi cancelado.`;
        }
        else if (action === 'updated') {
            message = `Sua sessão foi reagendada para o dia ${start_date_formatted} às ${start_time_formatted}.`;
        }
        if (message !== '') {
            await this.notificationService.create({
                user_id,
                message,
            });
        }
    }
    async validateDataAndCreate(data) {
        var _a;
        const parsed = schedules_dtos_1.schedulesValidationSchema.safeParse(data);
        if (!parsed.success) {
            const errorDetails = parsed;
            const firstError = (_a = errorDetails.error) === null || _a === void 0 ? void 0 : _a.errors[0];
            const errorMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.message) || 'Validation error';
            const codeMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.code) || 'invalid_type';
            throw new Error(`${errorMessage} (code: ${codeMessage})`);
        }
        const schedule = await this._schedule.create(data);
        await this.createAndSendNotification(schedule, 'created');
        return schedule;
    }
    async create(data) {
        try {
            if (data.start_date > data.end_date) {
                throw new common_1.BadRequestException({
                    message: 'Start date must be before end date',
                });
            }
            if (data.start_date.getDay() === 6 || data.start_date.getDay() === 0) {
                throw new common_1.BadRequestException({
                    message: 'Start date must be a weekday',
                });
            }
            const schedulesSearch = await this.findByDate(data.start_date, data.end_date);
            if (schedulesSearch.length > 0) {
                throw new common_1.BadRequestException({
                    message: 'Schedules already exist for this date',
                });
            }
            const filter = {
                status: 'pendente',
                user_id: data.user_id,
            };
            const schedulesPendent = await this._schedule.read(filter);
            if (schedulesPendent && schedulesPendent.length > 0) {
                throw new common_1.BadRequestException({
                    message: 'There are pending schedules',
                });
            }
            return this.validateDataAndCreate(data);
        }
        catch (error) {
            throw error;
        }
    }
    async read() {
        const schedules = await this._schedule.read();
        const today = new Date();
        const thisYear = today.getFullYear();
        const lastDateOfTheYear = new Date(thisYear, 11, 31);
        const schedulesFromGoogle = await this.googleCalendarService.listEvents(today, lastDateOfTheYear);
        if (!schedulesFromGoogle || schedulesFromGoogle.length === 0) {
            return schedules;
        }
        const schedulesFromGoogleFormatted = schedulesFromGoogle.map((event) => {
            const { start, end, id } = event;
            const startDate = new Date(start.dateTime);
            const endDate = new Date(end.dateTime);
            const google_event_id = id;
            return {
                _id: '',
                user_id: '',
                start_date: startDate,
                end_date: endDate,
                google_event_id,
                status: 'agendado',
                date_creation: new Date(),
                date_update: new Date(),
            };
        });
        return [...schedules, ...schedulesFromGoogleFormatted];
    }
    async readOne(id) {
        try {
            const schedule = await this._schedule.readOne(id);
            return schedule || null;
        }
        catch (error) {
            throw error;
        }
    }
    async findByUserId(userId) {
        try {
            const schedules = await this._schedule.read({ user_id: userId });
            return schedules.map((schedule) => schedule);
        }
        catch (error) {
            throw error;
        }
    }
    async findByDate(start_date, end_date) {
        try {
            if (end_date) {
                const schedules = await this._schedule.read({
                    start_date: { $gte: start_date },
                    end_date: { $lte: end_date },
                });
                const schedulesFromGoogle = await this.googleCalendarService.listEvents(start_date, end_date);
                if (schedulesFromGoogle && schedulesFromGoogle.length > 0) {
                    const schedulesFromGoogleFormatted = schedulesFromGoogle.map((event) => {
                        const { start, end, id } = event;
                        const startDate = new Date(start.dateTime);
                        const endDate = new Date(end.dateTime);
                        const google_event_id = id;
                        return {
                            _id: '',
                            user_id: '',
                            start_date: startDate,
                            end_date: endDate,
                            google_event_id,
                            status: 'agendado',
                            date_creation: new Date(),
                            date_update: new Date(),
                        };
                    });
                    if (!schedules.length && !schedulesFromGoogleFormatted.length) {
                        return [];
                    }
                    return [...schedules, ...schedulesFromGoogleFormatted];
                }
                else {
                    return schedules;
                }
            }
            else {
                const startOfDay = new Date(start_date);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(start_date);
                endOfDay.setHours(23, 59, 59, 999);
                const schedules = await this._schedule.read({
                    start_date: { $gte: startOfDay, $lte: endOfDay },
                });
                const schedulesFromGoogle = await this.googleCalendarService.listEvents(startOfDay, endOfDay);
                if (schedulesFromGoogle) {
                    const schedulesFromGoogleFormatted = schedulesFromGoogle.map((event) => {
                        const { start, end, id } = event;
                        const startDate = new Date(start.dateTime);
                        const endDate = new Date(end.dateTime);
                        const google_event_id = id;
                        return {
                            _id: '',
                            user_id: '',
                            start_date: startDate,
                            end_date: endDate,
                            google_event_id,
                            status: 'agendado',
                            date_creation: new Date(),
                            date_update: new Date(),
                        };
                    });
                    if (!schedules.length && !schedulesFromGoogleFormatted.length) {
                        return [];
                    }
                    return [...schedules, ...schedulesFromGoogleFormatted];
                }
                else {
                    return schedules;
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const existingSchedule = await this._schedule.readOne(id);
            if (!existingSchedule)
                throw new common_1.BadRequestException('Schedule not found');
            console.log({ el1: data.start_date, el2: existingSchedule.start_date });
            const isStartDateChanged = !data.start_date ? false : existingSchedule.start_date.toString() !== data.start_date.toString();
            const isEndDateChanged = !data.end_date ? false : existingSchedule.end_date.toString() !== data.end_date.toString();
            const isDateChanged = isStartDateChanged || isEndDateChanged;
            const updatedSchedule = await this._schedule.update(id, data);
            if (existingSchedule.google_event_id) {
                const googleEvent = await this.googleCalendarService.getEventById(existingSchedule.google_event_id);
                if (!googleEvent) {
                    if (isDateChanged) {
                        await this.createAndSendNotification(updatedSchedule, 'updated');
                    }
                    return updatedSchedule;
                }
                const startDateTime = updatedSchedule.start_date.toISOString();
                const endDateTime = updatedSchedule.end_date.toISOString();
                await this.googleCalendarService.updateEvent(existingSchedule.google_event_id, {
                    summary: googleEvent.summary,
                    description: googleEvent.description,
                    location: googleEvent.location,
                    start: {
                        dateTime: startDateTime,
                        timeZone: googleEvent.start.timeZone,
                    },
                    end: {
                        dateTime: endDateTime,
                        timeZone: googleEvent.end.timeZone,
                    },
                    attendees: googleEvent.attendees,
                    reminders: googleEvent.reminders,
                });
            }
            if (isDateChanged) {
                await this.createAndSendNotification(updatedSchedule, 'updated');
            }
            return updatedSchedule;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const existingSchedule = await this._schedule.readOne(id);
            if (!existingSchedule)
                throw new common_1.BadRequestException('Schedule not found');
            if (existingSchedule.google_event_id) {
                this.googleCalendarService.deleteEvent(existingSchedule.google_event_id);
            }
            const deletedSchedule = await this._schedule.delete(id);
            return deletedSchedule || null;
        }
        catch (error) {
            throw error;
        }
    }
    async filterAvailableSlots(dateInput, slots) {
        const dayStart = new Date(dateInput);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dateInput);
        dayEnd.setHours(23, 59, 59, 999);
        const existingAppointments = await this.findByDate(dayStart, dayEnd);
        const appointmentsTimeRanges = existingAppointments.map(appointment => ({
            start: new Date(appointment.start_date).getTime(),
            end: new Date(appointment.end_date).getTime()
        }));
        const result = slots.filter(slot => {
            const [startTime, endTime] = slot.split(' - ');
            const startTimeParts = startTime.split(':').map(Number);
            const endTimeParts = endTime.split(':').map(Number);
            const slotStart = new Date(dayStart);
            const slotEnd = new Date(dayStart);
            slotStart.setHours(startTimeParts[0], startTimeParts[1]);
            slotEnd.setHours(endTimeParts[0], endTimeParts[1]);
            return !appointmentsTimeRanges.some(appointment => {
                if (appointment.start === appointment.end) {
                    return false;
                }
                return (slotStart.getTime() < appointment.end && slotEnd.getTime() > appointment.start);
            });
        });
        return result;
    }
};
SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_service_1.default,
        google_calendar_service_1.default])
], SchedulesService);
exports.default = SchedulesService;
//# sourceMappingURL=schedules.service.js.map
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
const common_1 = require("@nestjs/common");
const payments_service_1 = require("../../payments/service/payments.service");
const schedules_service_1 = require("../../schedules/service/schedules.service");
const sessions_service_1 = require("../../sessions/service/sessions.service");
const google_calendar_service_1 = require("../google-calendar/google-calendar.service");
const users_service_1 = require("../../users/service/users.service");
let BookingService = class BookingService {
    constructor(schedulesService, paymentService, sessionService, googleCalendarService, userService) {
        this.schedulesService = schedulesService;
        this.paymentService = paymentService;
        this.sessionService = sessionService;
        this.googleCalendarService = googleCalendarService;
        this.userService = userService;
    }
    async deleteBooking(paymentId, sessionId, scheduleId) {
        try {
            const payment = await this.paymentService.delete(paymentId);
            if (!payment) {
                throw new Error('Failed to delete payment');
            }
            const session = await this.sessionService.delete(sessionId);
            if (!session) {
                throw new Error('Failed to delete session');
            }
            const schedule = await this.schedulesService.delete(scheduleId);
            if (!schedule) {
                throw new Error('Failed to delete schedule');
            }
            return {
                scheduleData: schedule,
                paymentData: payment,
                sessionData: session,
            };
        }
        catch (error) {
            console.error('Error deleting booking:', error.message);
            throw new Error('Failed to delete booking');
        }
    }
    async createBooking(data) {
        try {
            const { scheduleData, paymentData } = data;
            const schedule = await this.schedulesService.create(scheduleData);
            const schedule_id = schedule._id.toString();
            const user_id = schedule.user_id.toString();
            const userData = await this.userService.findById(user_id);
            const { name, email, phone } = userData;
            const stats = schedule.status === 'pendente' ? 'pendente' : 'cancelado';
            const stats2 = schedule.status === 'reembolsado' ? 'reembolsado' : stats;
            const paymentBody = {
                schedule_id,
                price: paymentData.price,
                status: schedule.status === 'agendado' || 'concluído' ? 'pago' : stats2,
            };
            const payment = await this.paymentService.create(paymentBody, user_id);
            const booking = {
                scheduleData: schedule,
                userData,
                paymentData: payment,
                sessionData: 'Pagamento não realizado, portanto a sessão não foi marcada ainda',
            };
            if (payment.status === 'pago') {
                const startDate = new Date(scheduleData.start_date);
                const day = String(startDate.getDate()).padStart(2, '0');
                const month = String(startDate.getMonth() + 1).padStart(2, '0');
                const year = startDate.getFullYear();
                const hours = String(startDate.getHours()).padStart(2, '0');
                const minutes = String(startDate.getMinutes()).padStart(2, '0');
                const sessionBody = {
                    schedule_id: schedule_id,
                    date: `Nova sessão de ${data.sessionName} agendada para a data ${day}/${month}/${year} às ${hours}:${minutes} com o cliente ${name}. Email: ${email}. Telefone: ${phone}`,
                    price: paymentData.price,
                };
                const session = await this.sessionService.create(sessionBody);
                console.log({ session });
                booking.sessionData = session;
                const eventData = {
                    summary: `Sessão de ${data.sessionName}`,
                    description: `Sessão de ${data.sessionName} agendada para a data ${day}/${month}/${year} às ${hours}:${minutes} - Cliente: ${name} - Telefone: ${phone}`,
                    location: 'Online',
                    start: {
                        dateTime: `${year}-${month}-${day}T${hours}:${minutes}:00`,
                        timeZone: 'America/Sao_Paulo',
                    },
                    end: {
                        dateTime: `${year}-${month}-${day}T${hours}:${minutes}:00`,
                        timeZone: 'America/Sao_Paulo',
                    },
                    attendees: [email],
                    reminders: {
                        useDefault: false,
                        overrides: [
                            { method: 'email', minutes: 24 * 60 },
                            { method: 'popup', minutes: 10 },
                            { method: 'popup', minutes: 30 },
                        ],
                    },
                };
                const event = await this.googleCalendarService.createEvent(eventData);
                await this.schedulesService.update(schedule._id, {
                    google_event_id: event.id,
                });
            }
            return booking;
        }
        catch (error) {
            throw error;
        }
    }
    async findBookingByScheduleId(scheduleId) {
        try {
            const schedule = await this.schedulesService.readOne(scheduleId);
            const payment = await this.paymentService.findByScheduleId(scheduleId);
            const session = await this.sessionService.findByScheduleId(scheduleId);
            const user_id = schedule.user_id.toString();
            const userData = await this.userService.findById(user_id);
            const sessionData = session
                ? session
                : 'Pagamento não realizado, portanto a sessão não foi marcada ainda';
            const booking = {
                scheduleData: schedule,
                paymentData: payment,
                sessionData,
                userData,
            };
            return booking;
        }
        catch (error) {
            throw error;
        }
    }
    async updateBooking(scheduleId, { scheduleData, sessionName }) {
        try {
            const { scheduleData: existingSchedule, paymentData: existingPayment, sessionData: existingsession, userData: existingUser, } = await this.findBookingByScheduleId(scheduleId);
            const { name, email, phone } = existingUser;
            if (!existingSchedule) {
                throw new Error('Existing schedule not found');
            }
            const updatedSchedule = await this.schedulesService.update(existingSchedule._id, scheduleData);
            const user_id = updatedSchedule.user_id.toString();
            const id = existingPayment._id.toString();
            const stats = existingSchedule.status === 'pendente' ? 'pendente' : 'cancelado';
            const stats2 = existingSchedule.status === 'reembolsado' ? 'reembolsado' : stats;
            existingPayment.status =
                existingSchedule.status === 'agendado' || 'concluído' ? 'pago' : stats2;
            const updatedPayment = await this.paymentService.update(id, existingPayment, user_id);
            const updatedBooking = {
                scheduleData: updatedSchedule,
                userData: await this.userService.findById(user_id),
                paymentData: updatedPayment,
                sessionData: 'Pagamento não realizado, portanto a sessão não foi marcada ainda',
            };
            if (updatedPayment.status === 'pago') {
                const startDate = new Date(scheduleData.start_date);
                const day = String(startDate.getDate()).padStart(2, '0');
                const month = String(startDate.getMonth() + 1).padStart(2, '0');
                const year = startDate.getFullYear();
                const hours = String(startDate.getHours()).padStart(2, '0');
                const minutes = String(startDate.getMinutes()).padStart(2, '0');
                const sessionBody = {
                    schedule_id: scheduleId,
                    date: `Nova sessão de ${sessionName} reagendada para a data ${day}/${month}/${year} às ${hours}:${minutes} com o cliente ${name}. Email: ${email}. Telefone: ${phone}`,
                    price: updatedPayment.price,
                };
                if (existingsession && typeof existingsession !== 'string') {
                    await this.sessionService.update(existingsession._id, sessionBody);
                    updatedBooking.sessionData = sessionBody;
                }
                else {
                    const session = await this.sessionService.create(sessionBody);
                    updatedBooking.sessionData = session;
                }
            }
            return updatedBooking;
        }
        catch (error) {
            throw error;
        }
    }
    async findBookingsByUser(userId) {
        try {
            const schedules = await this.schedulesService.findByUserId(userId);
            const bookings = await Promise.all(schedules.map(async (schedule) => {
                const payment = await this.paymentService.findByScheduleId(schedule._id);
                const session = await this.sessionService.findByScheduleId(schedule._id);
                const sessionData = session
                    ? session
                    : 'Pagamento não realizado, portanto a sessão não foi marcada ainda';
                return {
                    scheduleData: schedule,
                    paymentData: payment,
                    sessionData,
                    userData: await this.userService.findById(schedule.user_id.toString()),
                };
            }));
            return bookings;
        }
        catch (error) {
            throw error;
        }
    }
    async findAllBookingsForAdmin() {
        try {
            const schedules = await this.schedulesService.read();
            const bookings = [];
            for (const schedule of schedules) {
                if (!schedule.user_id || schedule.user_id === '') {
                    continue;
                }
                try {
                    const user = await this.userService.findById(schedule.user_id.toString());
                    if (user) {
                        const payment = await this.paymentService.findByScheduleId(schedule._id.toString());
                        const session = await this.sessionService.findByScheduleId(schedule._id.toString());
                        const sessionData = session
                            ? session
                            : 'Sessão ainda não definida ou pagamento pendente';
                        const bookingData = {
                            scheduleData: schedule,
                            paymentData: payment,
                            sessionData: sessionData,
                            userData: user,
                        };
                        bookings.push(bookingData);
                    }
                }
                catch (error) {
                    console.error(error);
                    continue;
                }
            }
            return bookings;
        }
        catch (error) {
            throw error;
        }
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedules_service_1.default,
        payments_service_1.default,
        sessions_service_1.default,
        google_calendar_service_1.default,
        users_service_1.default])
], BookingService);
exports.default = BookingService;
//# sourceMappingURL=booking.service.js.map
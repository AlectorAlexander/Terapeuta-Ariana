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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCalendarController = void 0;
const common_1 = require("@nestjs/common");
const google_calendar_service_1 = require("./google-calendar.service");
let GoogleCalendarController = class GoogleCalendarController {
    constructor(googleCalendarService) {
        this.googleCalendarService = googleCalendarService;
    }
    async createEvent(eventData) {
        try {
            const event = await this.googleCalendarService.createEvent(eventData);
            return event;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to create event',
                details: error.message,
            });
        }
    }
    async listEvents(timeMin, timeMax) {
        try {
            const parsedTimeMin = new Date(timeMin);
            const parsedTimeMax = new Date(timeMax);
            const events = await this.googleCalendarService.listEvents(parsedTimeMin, parsedTimeMax);
            return events;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to list events',
                details: error.message,
            });
        }
    }
    async updateEvent(eventId, eventData) {
        try {
            const event = await this.googleCalendarService.updateEvent(eventId, eventData);
            return event;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to update event',
                details: error.message,
            });
        }
    }
    async deleteEvent(eventId) {
        try {
            await this.googleCalendarService.deleteEvent(eventId);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to delete event',
                details: error.message,
            });
        }
    }
};
exports.GoogleCalendarController = GoogleCalendarController;
__decorate([
    (0, common_1.Post)('event'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleCalendarController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)('events/:timeMin/:timeMax'),
    __param(0, (0, common_1.Param)('timeMin')),
    __param(1, (0, common_1.Param)('timeMax')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GoogleCalendarController.prototype, "listEvents", null);
__decorate([
    (0, common_1.Put)('event/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GoogleCalendarController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.Delete)('event/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GoogleCalendarController.prototype, "deleteEvent", null);
exports.GoogleCalendarController = GoogleCalendarController = __decorate([
    (0, common_1.Controller)('calendar'),
    __metadata("design:paramtypes", [google_calendar_service_1.default])
], GoogleCalendarController);
//# sourceMappingURL=google-calendar.controller.js.map
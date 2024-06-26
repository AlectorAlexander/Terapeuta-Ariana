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
const googleapis_1 = require("googleapis");
let GoogleCalendarService = class GoogleCalendarService {
    constructor() {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });
        this.calendar = googleapis_1.google.calendar({ version: 'v3', auth });
    }
    async createEvent(eventData) {
        try {
            const event = await this.calendar.events.insert({
                calendarId: process.env.CALENDAR_ID,
                requestBody: eventData,
            });
            return event.data;
        }
        catch (error) {
            throw new Error(`Failed to create event: ${error.message}`);
        }
    }
    async getEventById(eventId) {
        try {
            const event = await this.calendar.events.get({
                calendarId: process.env.CALENDAR_ID,
                eventId: eventId,
            });
            return event.data;
        }
        catch (error) {
            if (error.message.includes('invalid_grant')) {
                console.warn(`Google Calendar access issue: ${error.message}`);
                return;
            }
            throw new Error(`Failed to get event by ID: ${error.message}`);
        }
    }
    async listEvents(timeMin, timeMax) {
        try {
            const events = await this.calendar.events.list({
                calendarId: process.env.CALENDAR_ID,
                timeMin: timeMin.toISOString(),
                timeMax: timeMax.toISOString(),
                singleEvents: true,
                orderBy: 'startTime',
            });
            return events.data.items;
        }
        catch (error) {
            if (error.message.includes('invalid_grant')) {
                console.warn(`Google Calendar access issue: ${error.message}`);
                return [];
            }
            throw new Error(`Failed to list events: ${error.message}`);
        }
    }
    async updateEvent(eventId, eventData) {
        try {
            const event = await this.calendar.events.patch({
                calendarId: process.env.CALENDAR_ID,
                eventId: eventId,
                requestBody: eventData,
            });
            return event.data;
        }
        catch (error) {
            console.log(error.message);
            if (error.message.includes('invalid_grant')) {
                console.warn(`Google Calendar access issue: ${error.message}`);
                return eventData;
            }
            throw new Error(`Failed to update event: ${error.message}`);
        }
    }
    async deleteEvent(eventId) {
        try {
            await this.calendar.events.delete({
                calendarId: process.env.CALENDAR_ID,
                eventId: eventId,
            });
        }
        catch (error) {
            throw new Error(`Failed to delete event: ${error.message}`);
        }
    }
};
GoogleCalendarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleCalendarService);
exports.default = GoogleCalendarService;
//# sourceMappingURL=google-calendar.service.js.map
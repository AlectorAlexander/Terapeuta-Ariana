import GoogleCalendarService from './google-calendar.service';
import { EventData, Event } from './event.interfaces';
export declare class GoogleCalendarController {
    private readonly googleCalendarService;
    constructor(googleCalendarService: GoogleCalendarService);
    createEvent(eventData: EventData): Promise<Event>;
    listEvents(timeMin: string, timeMax: string): Promise<Event[]>;
    updateEvent(eventId: string, eventData: EventData): Promise<Event>;
    deleteEvent(eventId: string): Promise<void>;
}

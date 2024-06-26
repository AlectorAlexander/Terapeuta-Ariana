import { EventData, Event } from './event.interfaces';
export default class GoogleCalendarService {
    private calendar;
    constructor();
    createEvent(eventData: EventData): Promise<Event>;
    getEventById(eventId: string): Promise<Event>;
    listEvents(timeMin: Date, timeMax: Date): Promise<Event[]>;
    updateEvent(eventId: string, eventData: EventData): Promise<Event>;
    deleteEvent(eventId: string): Promise<void>;
}

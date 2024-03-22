import { ISchedules } from './../dtos/schedules.dtos';
import { IService } from '../../interfaces/IService';
import NotificationService from '../../notifications/service/notifications.service';
import GoogleCalendarService from '../../booking/google-calendar/google-calendar.service';
declare class SchedulesService implements IService<ISchedules> {
    private readonly notificationService;
    private readonly googleCalendarService;
    private _schedule;
    constructor(notificationService: NotificationService, googleCalendarService: GoogleCalendarService);
    private createAndSendNotification;
    private validateDataAndCreate;
    create(data: ISchedules): Promise<ISchedules>;
    read(): Promise<ISchedules[]>;
    readOne(id: string): Promise<ISchedules | null>;
    findByUserId(userId: string): Promise<ISchedules[]>;
    findByDate(start_date: Date, end_date?: Date): Promise<ISchedules[]>;
    update(id: string, data: ISchedules): Promise<ISchedules | null>;
    delete(id: string): Promise<ISchedules | null>;
    filterAvailableSlots(dateInput: string | Date, slots: string[]): Promise<string[]>;
}
export default SchedulesService;

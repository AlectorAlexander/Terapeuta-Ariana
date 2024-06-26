import { INotifications } from '../dtos/notifications.dtos';
import NotificationService from '../service/notifications.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(req: any, data: INotifications): Promise<INotifications>;
    read(req: any): Promise<INotifications[]>;
    readOne(id: string): Promise<INotifications>;
    update(id: string, notificationUpdates: INotifications): Promise<INotifications>;
    delete(id: string): Promise<INotifications>;
}

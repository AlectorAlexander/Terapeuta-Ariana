import { WebSocketGateway } from './../gateway/notification.gateway';
import { IService } from 'src/modules/interfaces/IService';
import { INotifications } from '../dtos/notifications.dtos';
declare class NotificationService implements IService<INotifications> {
    private notificationGateway;
    private _notifications;
    constructor(notificationGateway: WebSocketGateway);
    private sortByDateCreation;
    private validateDataAndCreate;
    create(data: INotifications): Promise<INotifications>;
    delete(id: string): Promise<INotifications>;
    read(): Promise<INotifications[]>;
    readOne(id: string): Promise<INotifications>;
    findByUserId(userId: string): Promise<INotifications[]>;
    update(id: string, data: INotifications): Promise<INotifications>;
}
export default NotificationService;

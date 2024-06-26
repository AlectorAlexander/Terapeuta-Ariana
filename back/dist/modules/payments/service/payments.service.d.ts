import { IService } from '../../interfaces/IService';
import { IPayments } from '../dtos/payments.dtos';
import NotificationService from '../../notifications/service/notifications.service';
declare class PaymentService implements IService<IPayments> {
    private readonly notificationService;
    private _payments;
    constructor(notificationService: NotificationService);
    private createAndSendNotification;
    private sortByDateCreation;
    private validateDataAndCreate;
    create(data: IPayments, user_id?: string): Promise<IPayments>;
    delete(id: string): Promise<IPayments>;
    read(): Promise<IPayments[]>;
    readOne(id: string): Promise<IPayments>;
    findByScheduleId(scheduleId: string): Promise<IPayments>;
    update(_id: string, data: IPayments, user_id?: string): Promise<IPayments>;
}
export default PaymentService;

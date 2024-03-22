import PaymentService from '../service/payments.service';
import { IPayments } from '../dtos/payments.dtos';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    read(req: any): Promise<IPayments[]>;
    readOne(id: string): Promise<IPayments>;
    update(id: string, paymentUpdates: IPayments): Promise<IPayments>;
    delete(id: string): Promise<IPayments>;
}

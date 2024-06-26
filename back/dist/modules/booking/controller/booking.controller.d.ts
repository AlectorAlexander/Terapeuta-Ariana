import BookingService, { IBookingData } from '../service/booking.service';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(req: any, data: IBookingData): Promise<IBookingData>;
    getAllBookings(): Promise<IBookingData[]>;
    deleteBooking(data: {
        paymentId: string;
        sessionId: string;
        scheduleId: string;
    }): Promise<IBookingData>;
    findBookingByUserId(req: any): Promise<IBookingData[]>;
    update(scheduleId: string, data: IBookingData): Promise<IBookingData>;
    findBookingByScheduleId(scheduleId: string): Promise<IBookingData>;
}

import { ISchedules } from '../..//schedules/dtos/schedules.dtos';
import PaymentService from '../../payments/service/payments.service';
import SchedulesService from '../../schedules/service/schedules.service';
import { IPayments } from '../../payments/dtos/payments.dtos';
import SessionsService from '../../sessions/service/sessions.service';
import { ISessions } from '../../sessions/dtos/sessions.dtos';
import GoogleCalendarService from '../google-calendar/google-calendar.service';
import { IUser } from 'src/modules/users/dtos/users.dtos';
import UsersService from 'src/modules/users/service/users.service';
export type IBookingData = {
    scheduleData: ISchedules;
    paymentData: IPayments;
    sessionData: ISessions | string;
    sessionName?: string;
    userData?: IUser;
};
declare class BookingService {
    private schedulesService;
    private paymentService;
    private sessionService;
    private googleCalendarService;
    private userService;
    constructor(schedulesService: SchedulesService, paymentService: PaymentService, sessionService: SessionsService, googleCalendarService: GoogleCalendarService, userService: UsersService);
    deleteBooking(paymentId: string, sessionId: string, scheduleId: string): Promise<IBookingData | null>;
    createBooking(data: IBookingData): Promise<IBookingData>;
    findBookingByScheduleId(scheduleId: string): Promise<IBookingData>;
    updateBooking(scheduleId: string, { scheduleData, sessionName }: IBookingData): Promise<IBookingData>;
    findBookingsByUser(userId: string): Promise<IBookingData[]>;
    findAllBookingsForAdmin(): Promise<IBookingData[]>;
}
export default BookingService;

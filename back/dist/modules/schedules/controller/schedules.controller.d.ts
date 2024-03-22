import { ISchedules } from '../dtos/schedules.dtos';
import SchedulesService from '../service/schedules.service';
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    readAll(dates: {
        start_date: Date;
        end_date?: Date;
    }): Promise<ISchedules[]>;
    create(req: any, data: ISchedules): Promise<ISchedules>;
    read(req: any): Promise<ISchedules[]>;
    findByDate(dates: {
        start_date: Date;
        end_date?: Date;
    }): Promise<ISchedules[]>;
    readOne(id: string): Promise<ISchedules>;
    update(id: string, scheduleUpdates: ISchedules): Promise<ISchedules>;
    delete(id: string): Promise<ISchedules>;
    filterSlots(body: {
        date: Date;
        slots: string[];
    }): Promise<string[]>;
}

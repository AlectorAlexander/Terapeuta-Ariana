import { IService } from 'src/modules/interfaces/IService';
import { ISessions } from '../dtos/sessions.dtos';
declare class SessionsService implements IService<ISessions> {
    private _sessions;
    constructor();
    private sortByDateCreation;
    private validateDataAndCreate;
    create(data: ISessions): Promise<ISessions>;
    delete(id: string): Promise<ISessions>;
    read(): Promise<ISessions[]>;
    readOne(id: string): Promise<ISessions>;
    findByScheduleId(scheduleId: string): Promise<ISessions>;
    update(id: string, data: ISessions): Promise<ISessions>;
}
export default SessionsService;

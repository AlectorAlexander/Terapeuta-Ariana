import { ISessions } from '../dtos/sessions.dtos';
import SessionsService from '../service/sessions.service';
export declare class SessionsController {
    private readonly SessionsService;
    constructor(SessionsService: SessionsService);
    readAll(req: any): Promise<ISessions[]>;
    create(req: any, data: ISessions): Promise<ISessions>;
    readOne(id: string): Promise<ISessions>;
    read(req: any, id: string): Promise<ISessions | ISessions[]>;
    update(id: string, scheduleUpdates: ISessions): Promise<ISessions>;
    delete(id: string): Promise<ISessions>;
}

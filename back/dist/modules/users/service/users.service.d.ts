import { IService } from 'src/modules/interfaces/IService';
import { IUser } from '../dtos/users.dtos';
import 'dotenv/config';
import { validateToken } from 'src/modules/interfaces/interfaces';
export declare enum ErrorTypes {
    EntityNotFound = "EntityNotFound",
    InvalidMongoId = "InvalidMongoId",
    InvalidCredentials = "InvalidCredentials"
}
declare class UsersService implements IService<IUser> {
    private _user;
    constructor();
    private validateDataAndCreate;
    findById(id: string): Promise<IUser | null>;
    create(data: IUser): Promise<string>;
    readOne(email: string, password: string): Promise<string>;
    validate(token: any): Promise<validateToken>;
    read(): Promise<IUser[]>;
    update(id: string, obj: IUser | object): Promise<IUser>;
    updateByEmail(email: string, obj: IUser | object): Promise<string>;
    delete(id: string): Promise<IUser>;
    googleLogin(data: {
        google_id: string;
        email: string;
        name: string;
        phone: string;
        profile_photo?: string;
    }): Promise<string>;
}
export default UsersService;

import { IUser } from '../dtos/users.dtos';
import UsersService from '../service/users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(userData: IUser): Promise<string>;
    login(loginData: {
        email: string;
        password: string;
    }): Promise<string>;
    read(): Promise<IUser[]>;
    update(req: any, userUpdates: IUser | object): Promise<IUser>;
    updateByEmail(req: any, userUpdates: IUser | any): Promise<string>;
    delete(id: string): Promise<IUser>;
    googleLogin(googleData: {
        google_id: string;
        email: string;
        name: string;
        profile_photo?: string;
        phone: string;
    }): Promise<string>;
    validateToken(token: string): Promise<unknown>;
}

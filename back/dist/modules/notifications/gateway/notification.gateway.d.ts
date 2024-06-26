import { OnModuleInit } from '@nestjs/common';
import UsersService from 'src/modules/users/service/users.service';
import { INotifications } from '../dtos/notifications.dtos';
export declare class WebSocketGateway implements OnModuleInit {
    private wsServer;
    private clientMap;
    private clients;
    userService: UsersService;
    constructor();
    onModuleInit(): void;
    sendNotificationToUser(data: INotifications): void;
}

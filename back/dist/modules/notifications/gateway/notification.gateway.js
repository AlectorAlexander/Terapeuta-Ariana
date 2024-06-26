"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketGateway = void 0;
const websocket = require("websocket");
const http = require("http");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/service/users.service");
let WebSocketGateway = class WebSocketGateway {
    constructor() {
        this.clientMap = new Map();
        this.clients = [];
        this.userService = new users_service_1.default();
    }
    onModuleInit() {
        const server = http.createServer((request, response) => { });
        server.listen(8080, () => {
            console.log(new Date() + ' Server is listening on port 8080');
        });
        this.wsServer = new websocket.server({
            httpServer: server,
        });
        this.wsServer.on('request', (request) => {
            const connection = request.accept(null, request.origin);
            console.log(new Date() + ' Connection accepted from: ' + request.origin);
            this.clients.push(connection);
            console.log('Cliente adicionado: ', this.clients.length);
            connection.on('message', async (message) => {
                if (message.type === 'utf8') {
                    const token = JSON.parse(message.utf8Data);
                    try {
                        const { isValid, user } = await this.userService.validate(token);
                        if (isValid) {
                            const userId = user.id.toString();
                            this.clientMap.set(userId, connection);
                        }
                        else {
                            connection.close();
                        }
                    }
                    catch (error) {
                        console.log(error);
                        throw error;
                    }
                }
            });
            connection.on('close', (reasonCode, description) => {
                this.clients = this.clients.filter((client) => client !== connection);
                console.log(new Date() + ' Conexão fechada por: ' + connection.remoteAddress);
            });
        });
    }
    sendNotificationToUser(data) {
        const connection = this.clientMap.get(data.user_id);
        if (connection) {
            if (connection.readyState === connection.OPEN) {
                connection.sendUTF(JSON.stringify(data));
                console.log('Notificação enviada para o usuário:', data.user_id);
            }
            else {
                console.log('Conexão não está aberta para o usuário:', data.user_id);
            }
        }
        else {
            console.log('Nenhuma conexão encontrada para o usuário:', data.user_id);
        }
    }
};
exports.WebSocketGateway = WebSocketGateway;
exports.WebSocketGateway = WebSocketGateway = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WebSocketGateway);
//# sourceMappingURL=notification.gateway.js.map
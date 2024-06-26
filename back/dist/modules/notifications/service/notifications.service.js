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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_gateway_1 = require("./../gateway/notification.gateway");
const notifications_dtos_1 = require("../dtos/notifications.dtos");
const notifications_entity_1 = require("../entities/notifications.entity");
const common_1 = require("@nestjs/common");
let NotificationService = class NotificationService {
    constructor(notificationGateway) {
        this.notificationGateway = notificationGateway;
        this._notifications = new notifications_entity_1.default();
    }
    sortByDateCreation(a, b) {
        const dateA = a.date_creation || new Date(0);
        const dateB = b.date_creation || new Date(0);
        return dateA.getTime() - dateB.getTime();
    }
    async validateDataAndCreate(data) {
        var _a;
        const parsed = notifications_dtos_1.notificationsValidationSchema.safeParse(data);
        if (!parsed.success) {
            const errorDetails = parsed;
            const firstError = (_a = errorDetails.error) === null || _a === void 0 ? void 0 : _a.errors[0];
            const errorMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.message) || 'Validation error';
            const codeMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.code) || 'invalid_type';
            throw new Error(`${errorMessage} (code: ${codeMessage})`);
        }
        const notification = await this._notifications.create(data);
        return notification;
    }
    async create(data) {
        try {
            const notification = await this.validateDataAndCreate(data);
            this.notificationGateway.sendNotificationToUser(notification);
            return notification;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            return await this._notifications.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
    async read() {
        try {
            const notificationsFromDB = await this._notifications.read();
            const notifications = notificationsFromDB.map((notification) => (Object.assign({}, notification)));
            notifications.sort(this.sortByDateCreation);
            return notifications;
        }
        catch (error) {
            throw error;
        }
    }
    async readOne(id) {
        try {
            const notification = await this._notifications.readOne(id);
            return notification;
        }
        catch (error) {
            throw error;
        }
    }
    async findByUserId(userId) {
        try {
            const notificationsFromDB = await this._notifications.read({
                user_id: userId,
            });
            const notifications = notificationsFromDB.map((notification) => (Object.assign({}, notification)));
            notifications.sort(this.sortByDateCreation);
            return notifications;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        var _a;
        const parsed = notifications_dtos_1.notificationsValidationSchema.safeParse(data);
        if (!parsed.success) {
            const errorDetails = parsed;
            const firstError = (_a = errorDetails.error) === null || _a === void 0 ? void 0 : _a.errors[0];
            const errorMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.message) || 'Validation error';
            const codeMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.code) || 'invalid_type';
            throw new Error(`${errorMessage} (code: ${codeMessage})`);
        }
        try {
            const updatedNotification = await this._notifications.update(id, data);
            return updatedNotification;
        }
        catch (error) {
            throw error;
        }
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(notification_gateway_1.WebSocketGateway)),
    __metadata("design:paramtypes", [notification_gateway_1.WebSocketGateway])
], NotificationService);
exports.default = NotificationService;
//# sourceMappingURL=notifications.service.js.map
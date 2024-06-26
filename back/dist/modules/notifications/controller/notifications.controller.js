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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("../service/notifications.service");
const jwt_auth_guard_1 = require("../../users/service/jwt-auth.guard");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async create(req, data) {
        try {
            const userId = req.user.id;
            data.user_id = userId;
            if (data.notification_date) {
                data.notification_date = new Date(data.notification_date);
            }
            const notification = await this.notificationService.create(data);
            return notification;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to create notification',
                details: error.message,
            });
        }
    }
    async read(req) {
        try {
            const role = req.user.role;
            if (role === 'admin') {
                const notifications = await this.notificationService.read();
                return notifications;
            }
            else {
                const userId = req.user.id;
                const notifications = await this.notificationService.findByUserId(userId);
                return notifications;
            }
        }
        catch (error) {
            throw new common_1.NotFoundException('No notifications found');
        }
    }
    async readOne(id) {
        try {
            const notification = await this.notificationService.readOne(id);
            if (!notification) {
                throw new common_1.NotFoundException('Notification not found');
            }
            return notification;
        }
        catch (error) {
            throw new common_1.NotFoundException('Notification not found');
        }
    }
    async update(id, notificationUpdates) {
        try {
            const updatedNotification = await this.notificationService.update(id, notificationUpdates);
            if (!updatedNotification) {
                throw new common_1.NotFoundException('Notification not found');
            }
            return updatedNotification;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Failed to update notification',
                details: error.message,
            });
        }
    }
    async delete(id) {
        try {
            const deletedNotification = await this.notificationService.delete(id);
            if (!deletedNotification) {
                throw new common_1.NotFoundException('Notification not found');
            }
            return deletedNotification;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to delete notification',
                details: error.message,
            });
        }
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "read", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "readOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "delete", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.default])
], NotificationController);
//# sourceMappingURL=notifications.controller.js.map
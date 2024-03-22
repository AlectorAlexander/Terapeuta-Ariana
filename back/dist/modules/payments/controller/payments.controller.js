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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../users/service/jwt-auth.guard");
const payments_service_1 = require("../service/payments.service");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async read(req) {
        try {
            const payment = await this.paymentService.read();
            return payment;
        }
        catch (error) {
            throw new common_1.NotFoundException('No payment found');
        }
    }
    async readOne(id) {
        try {
            const notification = await this.paymentService.readOne(id);
            if (!notification) {
                throw new common_1.NotFoundException('Notification not found');
            }
            return notification;
        }
        catch (error) {
            throw new common_1.NotFoundException('Notification not found');
        }
    }
    async update(id, paymentUpdates) {
        try {
            const updatedNotification = await this.paymentService.update(id, paymentUpdates);
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
            const deletedNotification = await this.paymentService.delete(id);
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
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "read", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "readOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "delete", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payments_service_1.default])
], PaymentController);
//# sourceMappingURL=payments.controller.js.map
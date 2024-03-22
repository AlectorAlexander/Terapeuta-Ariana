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
const payments_dtos_1 = require("../dtos/payments.dtos");
const payments_entity_1 = require("../entities/payments.entity");
const notifications_service_1 = require("../../notifications/service/notifications.service");
const common_1 = require("@nestjs/common");
let PaymentService = class PaymentService {
    constructor(notificationService) {
        this.notificationService = notificationService;
        this._payments = new payments_entity_1.default();
    }
    async createAndSendNotification(data, user_id) {
        const { status, price } = data;
        let message = '';
        if (status === 'pago') {
            message = `Seu pagamento de R$${price} foi efetuado com sucesso`;
        }
        else if (status === 'cancelado') {
            message = `Seu pagamento foi cancelado`;
        }
        else if (status === 'pendente') {
            message = `Seu pagamento ainda não foi confirmado`;
        }
        if (message !== '') {
            await this.notificationService.create({
                message,
                user_id,
            });
        }
    }
    sortByDateCreation(a, b) {
        const dateA = a.date_creation || new Date(0);
        const dateB = b.date_creation || new Date(0);
        return dateA.getTime() - dateB.getTime();
    }
    async validateDataAndCreate(data) {
        var _a;
        const parsed = payments_dtos_1.paymentsValidationSchema.safeParse(data);
        if (!parsed.success) {
            const errorDetails = parsed;
            const firstError = (_a = errorDetails.error) === null || _a === void 0 ? void 0 : _a.errors[0];
            const errorMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.message) || 'Validation error';
            const codeMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.code) || 'invalid_type';
            throw new Error(`${errorMessage} (code: ${codeMessage})`);
        }
        const payment = await this._payments.create(data);
        return payment;
    }
    async create(data, user_id) {
        try {
            const payment = await this.validateDataAndCreate(data);
            if (user_id) {
                await this.createAndSendNotification(payment, user_id);
            }
            return payment;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            return await this._payments.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
    async read() {
        try {
            const paymentsFromDB = await this._payments.read();
            const payments = paymentsFromDB.map((payment) => payment.toObject());
            payments.sort(this.sortByDateCreation);
            return payments;
        }
        catch (error) {
            throw error;
        }
    }
    async readOne(id) {
        try {
            const payment = await this._payments.readOne(id);
            return payment;
        }
        catch (error) {
            throw error;
        }
    }
    async findByScheduleId(scheduleId) {
        try {
            const payment = await this._payments.read({
                schedule_id: scheduleId,
            });
            return payment[0];
        }
        catch (error) {
            throw error;
        }
    }
    async update(_id, data, user_id) {
        var _a;
        const parsed = payments_dtos_1.paymentsValidationSchema.safeParse(data);
        if (!parsed.success) {
            const errorDetails = parsed;
            const firstError = (_a = errorDetails.error) === null || _a === void 0 ? void 0 : _a.errors[0];
            const errorMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.message) || 'Validation error';
            const codeMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.code) || 'invalid_type';
            throw new Error(`${errorMessage} (code: ${codeMessage})`);
        }
        try {
            const updatedPayment = await this._payments.update(_id, data);
            if (user_id) {
                await this.createAndSendNotification(updatedPayment, user_id);
            }
            return updatedPayment;
        }
        catch (error) {
            throw error;
        }
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_service_1.default])
], PaymentService);
exports.default = PaymentService;
//# sourceMappingURL=payments.service.js.map
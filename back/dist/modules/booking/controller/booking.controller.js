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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("../service/booking.service");
const jwt_auth_guard_1 = require("../../users/service/jwt-auth.guard");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async create(req, data) {
        try {
            if (!data.scheduleData || !data.paymentData) {
                throw new common_1.BadRequestException({
                    message: 'Missing scheduleData or paymentData',
                    details: 'read the message, fool',
                });
            }
            const userId = req.user.id;
            data.scheduleData.user_id = userId;
            data.scheduleData.start_date = new Date(data.scheduleData.start_date);
            data.scheduleData.end_date = new Date(data.scheduleData.end_date);
            const booking = await this.bookingService.createBooking(data);
            if (!booking) {
                throw new common_1.BadRequestException({
                    message: 'Failed to create booking',
                    details: 'Booking creation returned null',
                });
            }
            return booking;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: error.message || 'Failed to create booking',
                details: error.message,
            });
        }
    }
    async getAllBookings() {
        try {
            const bookings = await this.bookingService.findAllBookingsForAdmin();
            return bookings;
        }
        catch (error) {
            console.log({ Booking_GetAll_70: error.message });
            throw new common_1.NotFoundException({
                message: 'Failed to find bookings',
                details: error.message,
            });
        }
    }
    async deleteBooking(data) {
        try {
            const { paymentId, sessionId, scheduleId } = data;
            const deletedBooking = await this.bookingService.deleteBooking(paymentId, sessionId, scheduleId);
            return deletedBooking;
        }
        catch (error) {
            console.error('Error deleting booking:', error.message);
            throw new common_1.BadRequestException({
                message: error.message || 'Failed to delete booking',
                details: error.message,
            });
        }
    }
    async findBookingByUserId(req) {
        try {
            const userId = req.user.id;
            const booking = await this.bookingService.findBookingsByUser(userId);
            if (!booking)
                throw new common_1.NotFoundException({
                    message: 'Failed to find booking',
                });
            return booking;
        }
        catch (error) {
            throw new common_1.NotFoundException({
                message: 'Failed to find booking',
                details: error.message,
            });
        }
    }
    async update(scheduleId, data) {
        try {
            const updatedBooking = await this.bookingService.updateBooking(scheduleId, data);
            return updatedBooking;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Failed to update booking',
                details: error.message,
            });
        }
    }
    async findBookingByScheduleId(scheduleId) {
        try {
            const booking = await this.bookingService.findBookingByScheduleId(scheduleId);
            if (!booking)
                throw new common_1.NotFoundException({
                    message: 'Failed to find booking',
                });
            return booking;
        }
        catch (error) {
            throw new common_1.NotFoundException({
                message: 'Failed to find booking',
                details: error.message,
            });
        }
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getAllBookings", null);
__decorate([
    (0, common_1.Post)('Delete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "deleteBooking", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findBookingByUserId", null);
__decorate([
    (0, common_1.Put)(':scheduleId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('scheduleId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':scheduleId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('scheduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findBookingByScheduleId", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.default])
], BookingController);
//# sourceMappingURL=booking.controller.js.map
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
exports.SchedulesController = void 0;
const common_1 = require("@nestjs/common");
const schedules_service_1 = require("../service/schedules.service");
const jwt_auth_guard_1 = require("../../users/service/jwt-auth.guard");
let SchedulesController = class SchedulesController {
    constructor(schedulesService) {
        this.schedulesService = schedulesService;
    }
    async readAll(dates) {
        try {
            const schedules = await this.schedulesService.findByDate(dates.start_date, dates.end_date);
            return schedules;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException('No schedules found for this date');
        }
    }
    async create(req, data) {
        try {
            const userId = req.user.id;
            data.user_id = userId;
            data.start_date = new Date(data.start_date);
            data.end_date = new Date(data.end_date);
            const schedule = await this.schedulesService.create(data);
            return schedule;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to create schedule',
                details: error.message,
            });
        }
    }
    async read(req) {
        try {
            const role = req.user.role;
            if (role === 'admin') {
                const schedules = await this.schedulesService.read();
                return schedules;
            }
            else {
                const userId = req.user.id;
                const schedules = await this.schedulesService.findByUserId(userId);
                return schedules;
            }
        }
        catch (error) {
            throw new common_1.NotFoundException('No schedules found');
        }
    }
    async findByDate(dates) {
        try {
            const schedules = await this.schedulesService.findByDate(dates.start_date, dates.end_date);
            return schedules;
        }
        catch (error) {
            throw new common_1.NotFoundException('No schedules found for this date');
        }
    }
    async readOne(id) {
        try {
            const schedule = await this.schedulesService.readOne(id);
            if (!schedule) {
                throw new common_1.NotFoundException('Schedule not found');
            }
            return schedule;
        }
        catch (error) {
            throw new common_1.NotFoundException('Schedule not found');
        }
    }
    async update(id, scheduleUpdates) {
        try {
            const updatedSchedule = await this.schedulesService.update(id, scheduleUpdates);
            if (!updatedSchedule) {
                throw new common_1.NotFoundException('Schedule not found');
            }
            return updatedSchedule;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to update schedule',
                details: error.message,
            });
        }
    }
    async delete(id) {
        try {
            const deletedSchedule = await this.schedulesService.delete(id);
            if (!deletedSchedule) {
                throw new common_1.NotFoundException('Schedule not found');
            }
            return deletedSchedule;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to delete schedule',
                details: error.message,
            });
        }
    }
    async filterSlots(body) {
        try {
            const { date, slots } = body;
            const filteredSlots = await this.schedulesService.filterAvailableSlots(date, slots);
            return filteredSlots;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({
                message: 'Failed to filter available slots',
                details: error.message,
            });
        }
    }
};
exports.SchedulesController = SchedulesController;
__decorate([
    (0, common_1.Post)('calendar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "readAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "read", null);
__decorate([
    (0, common_1.Post)('date'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "findByDate", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "readOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('filter-slots'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchedulesController.prototype, "filterSlots", null);
exports.SchedulesController = SchedulesController = __decorate([
    (0, common_1.Controller)('schedules'),
    __metadata("design:paramtypes", [schedules_service_1.default])
], SchedulesController);
//# sourceMappingURL=schedules.controller.js.map
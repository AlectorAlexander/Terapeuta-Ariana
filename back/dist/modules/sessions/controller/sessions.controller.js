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
exports.SessionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../users/service/jwt-auth.guard");
const sessions_service_1 = require("../service/sessions.service");
let SessionsController = class SessionsController {
    constructor(SessionsService) {
        this.SessionsService = SessionsService;
    }
    async readAll(req) {
        try {
            const sessions = await this.SessionsService.read();
            return sessions;
        }
        catch (error) {
            throw new common_1.NotFoundException('No sessions found');
        }
    }
    async create(req, data) {
        try {
            const session = await this.SessionsService.create(data);
            return session;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to create session',
                details: error.message,
            });
        }
    }
    async readOne(id) {
        try {
            const session = await this.SessionsService.readOne(id);
            if (!session) {
                throw new common_1.NotFoundException('session not found');
            }
            return session;
        }
        catch (error) {
            throw new common_1.NotFoundException('session not found');
        }
    }
    async read(req, id) {
        try {
            const role = req.user.role;
            if (role === 'admin') {
                const sessions = await this.SessionsService.read();
                return sessions;
            }
            else {
                const sessions = await this.SessionsService.findByScheduleId(id);
                return sessions;
            }
        }
        catch (error) {
            throw new common_1.NotFoundException('No sessions found');
        }
    }
    async update(id, scheduleUpdates) {
        try {
            const updatedSchedule = await this.SessionsService.update(id, scheduleUpdates);
            if (!updatedSchedule) {
                throw new common_1.NotFoundException('session not found');
            }
            return updatedSchedule;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to update session',
                details: error.message,
            });
        }
    }
    async delete(id) {
        try {
            const session = await this.SessionsService.delete(id);
            if (!session) {
                throw new common_1.NotFoundException('session not found');
            }
            return session;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to delete session',
                details: error.message,
            });
        }
    }
};
exports.SessionsController = SessionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "readAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "readOne", null);
__decorate([
    (0, common_1.Get)('/schedule:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "read", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "delete", null);
exports.SessionsController = SessionsController = __decorate([
    (0, common_1.Controller)('sessions'),
    __metadata("design:paramtypes", [sessions_service_1.default])
], SessionsController);
//# sourceMappingURL=sessions.controller.js.map
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
const common_1 = require("@nestjs/common");
const sessions_dtos_1 = require("../dtos/sessions.dtos");
const sessions_entity_1 = require("../entities/sessions.entity");
let SessionsService = class SessionsService {
    constructor() {
        this._sessions = new sessions_entity_1.default();
    }
    sortByDateCreation(a, b) {
        const dateA = a.date_creation || new Date(0);
        const dateB = b.date_creation || new Date(0);
        return dateA.getTime() - dateB.getTime();
    }
    async validateDataAndCreate(data) {
        var _a;
        const parsed = sessions_dtos_1.sessionsValidationSchema.safeParse(data);
        if (!parsed.success) {
            const errorDetails = parsed;
            const firstError = (_a = errorDetails.error) === null || _a === void 0 ? void 0 : _a.errors[0];
            const errorMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.message) || 'Validation error';
            const codeMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.code) || 'invalid_type';
            throw new Error(`${errorMessage} (code: ${codeMessage})`);
        }
        const session = await this._sessions.create(data);
        return session;
    }
    async create(data) {
        try {
            return this.validateDataAndCreate(data);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            return await this._sessions.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
    async read() {
        try {
            const sessionsFromDB = await this._sessions.read();
            const sessions = sessionsFromDB.map((session) => (Object.assign({}, session)));
            sessions.sort(this.sortByDateCreation);
            return sessions;
        }
        catch (error) {
            throw error;
        }
    }
    async readOne(id) {
        try {
            const session = await this._sessions.readOne(id);
            return session;
        }
        catch (error) {
            throw error;
        }
    }
    async findByScheduleId(scheduleId) {
        try {
            const payment = await this._sessions.read({
                schedule_id: scheduleId,
            });
            return payment[0];
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        var _a;
        const parsed = sessions_dtos_1.sessionsValidationSchema.safeParse(data);
        if (!parsed.success) {
            const errorDetails = parsed;
            const firstError = (_a = errorDetails.error) === null || _a === void 0 ? void 0 : _a.errors[0];
            const errorMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.message) || 'Validation error';
            const codeMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.code) || 'invalid_type';
            throw new Error(`${errorMessage} (code: ${codeMessage})`);
        }
        try {
            const updatedsessions = await this._sessions.update(id, data);
            return updatedsessions;
        }
        catch (error) {
            throw error;
        }
    }
};
SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SessionsService);
exports.default = SessionsService;
//# sourceMappingURL=sessions.service.js.map
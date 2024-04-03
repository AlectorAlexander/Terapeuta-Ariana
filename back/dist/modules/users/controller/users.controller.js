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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../service/users.service");
const jwt_auth_guard_1 = require("../service/jwt-auth.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async register(userData) {
        try {
            const createdUserId = await this.usersService.create(userData);
            return createdUserId;
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
    async login(loginData) {
        try {
            const { email, password } = loginData;
            const user = await this.usersService.readOne(email, password);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
    async read() {
        try {
            const users = await this.usersService.read();
            return users;
        }
        catch (error) {
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
    async update(req, userUpdates) {
        try {
            const userId = req.user.id;
            console.log(userId);
            const updatedUser = await this.usersService.update(userId, userUpdates);
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
    async updateByEmail(req, userUpdates) {
        try {
            const { email } = userUpdates, restOfUserUpdates = __rest(userUpdates, ["email"]);
            const updatedUser = await this.usersService.updateByEmail(email || 'pamonha', restOfUserUpdates);
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
    async delete(id) {
        try {
            const deletedUser = await this.usersService.delete(id);
            if (!deletedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return deletedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
    async googleLogin(googleData) {
        try {
            const token = await this.usersService.googleLogin(googleData);
            return token;
        }
        catch (error) {
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
    async validateToken(token) {
        try {
            const isValid = await this.usersService.validate(token);
            return isValid;
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid token');
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "read", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('byEmail'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateByEmail", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('google-login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "googleLogin", null);
__decorate([
    (0, common_1.Post)('validate-token'),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "validateToken", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.default])
], UsersController);
//# sourceMappingURL=users.controller.js.map
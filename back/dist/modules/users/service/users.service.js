"use strict";
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
exports.ErrorTypes = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const users_dtos_1 = require("../dtos/users.dtos");
const bcrypt_1 = require("bcrypt");
require("dotenv/config");
const users_entity_1 = require("../entities/users.entity");
const common_1 = require("@nestjs/common");
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["EntityNotFound"] = "EntityNotFound";
    ErrorTypes["InvalidMongoId"] = "InvalidMongoId";
    ErrorTypes["InvalidCredentials"] = "InvalidCredentials";
})(ErrorTypes || (exports.ErrorTypes = ErrorTypes = {}));
const { JWT_SECRET } = process.env;
const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};
class UsersService {
    constructor() {
        this._user = new users_entity_1.default();
    }
    async validateDataAndCreate(data) {
        const parsed = users_dtos_1.userValidationSchema.safeParse(data);
        if (!parsed.success) {
            const errorDetails = parsed;
            const { message, code } = errorDetails.error.errors[0];
            throw new Error(`${message} (code: ${code})`);
        }
        const { password } = data;
        const saltRounds = 10;
        const hashedPassword = await (0, bcrypt_1.hash)(password, saltRounds);
        const user = await this._user.create(Object.assign(Object.assign({}, parsed.data), { password: hashedPassword }));
        return user;
    }
    async findById(id) {
        try {
            const user = await this._user.readOne(id);
            if (!user)
                return null;
            const userObject = user.toObject();
            const { password } = userObject, userWithoutPassword = __rest(userObject, ["password"]);
            return userWithoutPassword;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to find user',
                details: error.message,
            });
        }
    }
    async create(data) {
        try {
            const existingUser = await this._user.readOneByEmail(data.email);
            if (existingUser) {
                throw new common_1.ConflictException('O e-mail fornecido já está registrado.');
            }
            if (!data.role) {
                data.role = 'user';
            }
            const user = await this.validateDataAndCreate(data);
            return (0, jsonwebtoken_1.sign)({ id: user._id, role: user.role }, JWT_SECRET, jwtConfig);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async readOne(email, password) {
        const user = await this._user.readOneByEmail(email);
        if (!user) {
            throw new Error(ErrorTypes.EntityNotFound);
        }
        if (!user.password && user.google_id) {
            const saltRounds = 10;
            const hashedPassword = await (0, bcrypt_1.hash)(password, saltRounds);
            this._user.update(user._id, {
                password: hashedPassword,
            });
        }
        else {
            const isMatch = await (0, bcrypt_1.compare)(password, user.password);
            if (!isMatch) {
                throw new Error(ErrorTypes.InvalidCredentials);
            }
        }
        return (0, jsonwebtoken_1.sign)({ id: user._id, role: user.role }, JWT_SECRET, jwtConfig);
    }
    async validate(token) {
        try {
            const decodedToken = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
            const userId = decodedToken.id;
            const user = await this._user.readOne(userId);
            if (user) {
                const isAdmin = user.role === 'admin';
                return {
                    isValid: true,
                    user: {
                        name: user.name,
                        email: user.email,
                        id: user._id,
                        photo: user.profile_photo,
                        isAdmin,
                    },
                };
            }
            else {
                return { isValid: false };
            }
        }
        catch (error) {
            return { isValid: false };
        }
    }
    async read() {
        const results = await this._user.read();
        if (!results) {
            throw new Error(ErrorTypes.EntityNotFound);
        }
        const users = results.map((user) => {
            const userWithoutPassword = __rest(user, []);
            return userWithoutPassword;
        });
        return users;
    }
    async update(id, obj) {
        var _a, _b, _c, _d, _e, _f;
        const parsed = users_dtos_1.userValidationSchema.safeParse(obj);
        if (!parsed.success) {
            const errorDetails = parsed;
            const errorMessage = ((_c = (_b = (_a = errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.error) === null || _a === void 0 ? void 0 : _a.errors) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.message) || 'Validation error';
            const errorCode = ((_f = (_e = (_d = errorDetails === null || errorDetails === void 0 ? void 0 : errorDetails.error) === null || _d === void 0 ? void 0 : _d.errors) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.code) || 'invalid_type';
            throw new Error(`${errorMessage} (code: ${errorCode})`);
        }
        let updatedUser;
        if ('password' in obj && typeof obj['password'] === 'string') {
            const saltRounds = 10;
            const hashedPassword = await (0, bcrypt_1.hash)(obj['password'], saltRounds);
            updatedUser = Object.assign(Object.assign({}, obj), { password: hashedPassword });
        }
        else {
            updatedUser = obj;
        }
        const User = await this._user.update(id, updatedUser);
        if (!User)
            throw new Error(ErrorTypes.EntityNotFound);
        return User;
    }
    async updateByEmail(email, obj) {
        let updatedUser;
        if ('password' in obj && typeof obj['password'] === 'string') {
            const saltRounds = 10;
            const hashedPassword = await (0, bcrypt_1.hash)(obj['password'], saltRounds);
            updatedUser = Object.assign(Object.assign({}, obj), { password: hashedPassword });
        }
        else {
            updatedUser = obj;
        }
        const User = await this._user.updateByEmail(email, updatedUser);
        if (!User)
            throw new Error(ErrorTypes.EntityNotFound);
        return (0, jsonwebtoken_1.sign)({ id: User._id }, JWT_SECRET, jwtConfig);
    }
    async delete(id) {
        const User = await this._user.delete(id);
        if (!User)
            throw new Error(ErrorTypes.EntityNotFound);
        return User;
    }
    async doesUserHavePhoneNumberINTERROGATION(data) {
        try {
            const existingUser = await this._user.readOneByEmail(data.email);
            if (existingUser) {
                const userHasGoogleId = !!existingUser.google_id;
                const incomingGoogleId = data.google_id;
                if (!userHasGoogleId && incomingGoogleId) {
                    console.log('[SERVICE] Usuário com email encontrado, mas sem google_id. Atualizando...');
                    await this._user.update(existingUser._id, {
                        google_id: incomingGoogleId,
                    });
                    return !!existingUser.phone;
                }
                if (userHasGoogleId && existingUser.google_id !== incomingGoogleId) {
                    console.log('id já existente:', existingUser.google_id);
                    console.log('id não existente:', incomingGoogleId);
                    throw new Error('Email already registered without Google.');
                }
                return !!existingUser.phone;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error('[SERVICE] Erro em doesUserHavePhoneNumberINTERROGATION:', error);
            throw error;
        }
    }
    async googleLogin(data) {
        try {
            const existingUser = await this._user.readOneByEmail(data.email);
            if (existingUser) {
                if (existingUser.google_id !== data.google_id) {
                    const err = new Error('Email already registered without Google.');
                    err.name = 'GoogleAuthEmailMismatch';
                    throw err;
                }
                return (0, jsonwebtoken_1.sign)({ id: existingUser._id, role: existingUser.role }, JWT_SECRET, jwtConfig);
            }
            else {
                const user = await this._user.create({
                    role: 'user',
                    email: data.email,
                    name: data.name,
                    google_id: data.google_id,
                    profile_photo: data.profile_photo,
                    phone: data.phone,
                });
                return (0, jsonwebtoken_1.sign)({ id: user._id, role: user.role }, JWT_SECRET, jwtConfig);
            }
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsModule = void 0;
const common_1 = require("@nestjs/common");
const sessions_service_1 = require("./service/sessions.service");
const sessions_controller_1 = require("./controller/sessions.controller");
let sessionsModule = class sessionsModule {
};
exports.sessionsModule = sessionsModule;
exports.sessionsModule = sessionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [sessions_controller_1.SessionsController],
        providers: [sessions_service_1.default],
        exports: [sessions_service_1.default],
    })
], sessionsModule);
//# sourceMappingURL=sessions.module.js.map
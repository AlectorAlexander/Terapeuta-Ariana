"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesModule = void 0;
const common_1 = require("@nestjs/common");
const schedules_controller_1 = require("./controller/schedules.controller");
const schedules_service_1 = require("./service/schedules.service");
const notifications_module_1 = require("../notifications/notifications.module");
const booking_module_1 = require("../booking/booking.module");
let SchedulesModule = class SchedulesModule {
};
exports.SchedulesModule = SchedulesModule;
exports.SchedulesModule = SchedulesModule = __decorate([
    (0, common_1.Module)({
        controllers: [schedules_controller_1.SchedulesController],
        providers: [schedules_service_1.default],
        exports: [schedules_service_1.default],
        imports: [notifications_module_1.NotificationsModule, (0, common_1.forwardRef)(() => booking_module_1.BookingModule)],
    })
], SchedulesModule);
//# sourceMappingURL=schedules.module.js.map
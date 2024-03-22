"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const payments_module_1 = require("../payments/payments.module");
const common_1 = require("@nestjs/common");
const booking_controller_1 = require("./controller/booking.controller");
const booking_service_1 = require("./service/booking.service");
const schedules_module_1 = require("../schedules/schedules.module");
const sessions_module_1 = require("../sessions/sessions.module");
const google_calendar_controller_1 = require("./google-calendar/google-calendar.controller");
const google_calendar_service_1 = require("./google-calendar/google-calendar.service");
const users_module_1 = require("../users/users.module");
let BookingModule = class BookingModule {
};
exports.BookingModule = BookingModule;
exports.BookingModule = BookingModule = __decorate([
    (0, common_1.Module)({
        controllers: [booking_controller_1.BookingController, google_calendar_controller_1.GoogleCalendarController],
        providers: [booking_service_1.default, google_calendar_service_1.default],
        imports: [
            (0, common_1.forwardRef)(() => schedules_module_1.SchedulesModule),
            payments_module_1.PaymentModule,
            sessions_module_1.sessionsModule,
            users_module_1.UsersModule,
        ],
        exports: [google_calendar_service_1.default],
    })
], BookingModule);
//# sourceMappingURL=booking.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const booking_module_1 = require("./booking/booking.module");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./users/users.module");
const jwt_middleware_consume_1 = require("./users/service/jwt-middleware-consume");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./users/service/jwt.strategy");
const jwt_auth_guard_1 = require("./users/service/jwt-auth.guard");
const schedules_module_1 = require("./schedules/schedules.module");
const notifications_module_1 = require("./notifications/notifications.module");
const payments_module_1 = require("./payments/payments.module");
const sessions_module_1 = require("./sessions/sessions.module");
const products_module_1 = require("./products/products.module");
const posts_module_1 = require("./posts/posts.module");
const { JWT_SECRET } = process.env;
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(jwt_middleware_consume_1.LoggerMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: JWT_SECRET,
                signOptions: { expiresIn: '1h' },
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_DB_URL, {
                autoCreate: true,
                connectionFactory: (connection) => {
                    connection.on('connected', () => {
                        console.log('Database connection established!');
                    });
                    return connection;
                },
            }),
            users_module_1.UsersModule,
            schedules_module_1.SchedulesModule,
            notifications_module_1.NotificationsModule,
            booking_module_1.BookingModule,
            payments_module_1.PaymentModule,
            sessions_module_1.sessionsModule,
            products_module_1.productsModule,
            posts_module_1.postsModule,
        ],
        providers: [jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard],
    })
], AppModule);
//# sourceMappingURL=main.module.js.map
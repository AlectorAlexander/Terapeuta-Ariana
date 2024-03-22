"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsValidationSchema = void 0;
const zod_1 = require("zod");
exports.notificationsValidationSchema = zod_1.z.object({
    _id: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    user_id: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    message: zod_1.z.string().min(1).max(255).optional(),
    notification_date: zod_1.z.date().optional(),
    read: zod_1.z.boolean().optional(),
    date_creation: zod_1.z.date().optional(),
    date_update: zod_1.z.date().optional(),
});
//# sourceMappingURL=notifications.dtos.js.map
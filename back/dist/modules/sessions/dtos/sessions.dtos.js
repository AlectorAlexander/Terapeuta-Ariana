"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsValidationSchema = void 0;
const zod_1 = require("zod");
exports.sessionsValidationSchema = zod_1.z.object({
    _id: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    schedule_id: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    date: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0.01).max(999999.99).optional(),
    date_creation: zod_1.z.date().optional(),
    date_update: zod_1.z.date().optional(),
});
//# sourceMappingURL=sessions.dtos.js.map
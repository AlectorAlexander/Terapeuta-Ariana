"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedulesValidationSchema = void 0;
const zod_1 = require("zod");
exports.schedulesValidationSchema = zod_1.z.object({
    _id: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    user_id: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    start_date: zod_1.z.date().optional(),
    end_date: zod_1.z.date().optional(),
    status: zod_1.z.enum([
        'pendente',
        'agendado',
        'cancelado',
        'reembolsado',
        'concluído',
    ]),
    google_event_id: zod_1.z.string().optional(),
    date_creation: zod_1.z.date().optional(),
    date_update: zod_1.z.date().optional(),
});
//# sourceMappingURL=schedules.dtos.js.map
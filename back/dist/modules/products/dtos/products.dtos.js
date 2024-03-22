"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
exports.productValidationSchema = zod_1.z.object({
    _id: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    duracao: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0.01).max(999999.99).optional(),
    date_creation: zod_1.z.date().optional(),
    date_update: zod_1.z.date().optional(),
    stripe_id: zod_1.z.string().optional(),
});
//# sourceMappingURL=products.dtos.js.map
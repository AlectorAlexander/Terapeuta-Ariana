"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsValidationSchema = void 0;
const mongodb_1 = require("mongodb");
const zod_1 = require("zod");
const idSchema = zod_1.z
    .custom((input) => {
    if (typeof input === 'string' && /^[0-9a-fA-F]{24}$/.test(input)) {
        return true;
    }
    if (input instanceof mongodb_1.ObjectId) {
        return true;
    }
    return false;
})
    .transform((input) => (input instanceof mongodb_1.ObjectId ? input.toString() : input));
exports.paymentsValidationSchema = zod_1.z.object({
    _id: idSchema.optional(),
    schedule_id: idSchema.optional(),
    price: zod_1.z.number().min(0.01).max(999999.99).optional(),
    status: zod_1.z.enum(['pendente', 'pago', 'cancelado', 'reembolsado']).optional(),
    date_creation: zod_1.z.date().optional(),
    date_update: zod_1.z.date().optional(),
    paymentIntentId: zod_1.z.string().optional(),
});
//# sourceMappingURL=payments.dtos.js.map
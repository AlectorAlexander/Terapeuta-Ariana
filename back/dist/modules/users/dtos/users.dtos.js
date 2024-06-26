"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const phoneRegExp = /^\(\d{2}\) \d{5}-\d{4}$/;
const phoneNumberValidator = (value) => {
    if (!phoneRegExp.test(value)) {
        throw new Error('Número de telefone inválido');
    }
    return value;
};
exports.userValidationSchema = zod_1.z.object({
    _id: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id format.')
        .optional(),
    role: zod_1.z.enum(['user', 'admin']),
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters long.').max(50),
    email: zod_1.z.string().email('Invalid email format.').min(5).max(255),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters long.')
        .max(255)
        .optional(),
    profile_photo: zod_1.z.string().optional(),
    google_id: zod_1.z.string().optional(),
    facebook_id: zod_1.z.string().optional(),
    phone: zod_1.z
        .string()
        .refine(phoneNumberValidator, {
        message: 'Número de telefone inválido',
    })
        .optional(),
    date_creation: zod_1.z.date().optional(),
    date_update: zod_1.z.date().optional(),
});
//# sourceMappingURL=users.dtos.js.map
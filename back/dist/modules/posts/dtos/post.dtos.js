"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidationSchema = void 0;
const zod_1 = require("zod");
exports.postValidationSchema = zod_1.z.object({
    _id: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional(),
    title: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    date_creation: zod_1.z.date().optional(),
    date_update: zod_1.z.date().optional(),
});
//# sourceMappingURL=post.dtos.js.map
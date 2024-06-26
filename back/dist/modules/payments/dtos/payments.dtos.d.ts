import { z } from 'zod';
export declare const paymentsValidationSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodEffects<z.ZodType<unknown, z.ZodTypeDef, unknown>, unknown, unknown>>;
    schedule_id: z.ZodOptional<z.ZodEffects<z.ZodType<unknown, z.ZodTypeDef, unknown>, unknown, unknown>>;
    price: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["pendente", "pago", "cancelado", "reembolsado"]>>;
    date_creation: z.ZodOptional<z.ZodDate>;
    date_update: z.ZodOptional<z.ZodDate>;
    paymentIntentId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    _id?: unknown;
    schedule_id?: unknown;
    price?: number;
    status?: "pendente" | "pago" | "cancelado" | "reembolsado";
    date_creation?: Date;
    date_update?: Date;
    paymentIntentId?: string;
}, {
    _id?: unknown;
    schedule_id?: unknown;
    price?: number;
    status?: "pendente" | "pago" | "cancelado" | "reembolsado";
    date_creation?: Date;
    date_update?: Date;
    paymentIntentId?: string;
}>;
export type IPayments = z.infer<typeof paymentsValidationSchema>;

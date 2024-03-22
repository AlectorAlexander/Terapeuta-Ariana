import { z } from 'zod';
export declare const sessionsValidationSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    schedule_id: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    date_creation: z.ZodOptional<z.ZodDate>;
    date_update: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    _id?: string;
    schedule_id?: string;
    date?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
}, {
    _id?: string;
    schedule_id?: string;
    date?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
}>;
export type ISessions = z.infer<typeof sessionsValidationSchema>;

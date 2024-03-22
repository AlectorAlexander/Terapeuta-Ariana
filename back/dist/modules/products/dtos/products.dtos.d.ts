import { z } from 'zod';
export declare const productValidationSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    duracao: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    date_creation: z.ZodOptional<z.ZodDate>;
    date_update: z.ZodOptional<z.ZodDate>;
    stripe_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    _id?: string;
    title?: string;
    description?: string;
    image?: string;
    duracao?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
    stripe_id?: string;
}, {
    _id?: string;
    title?: string;
    description?: string;
    image?: string;
    duracao?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
    stripe_id?: string;
}>;
export type IProduct = z.infer<typeof productValidationSchema>;

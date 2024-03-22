import { z } from 'zod';
export declare const postValidationSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    date_creation: z.ZodOptional<z.ZodDate>;
    date_update: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    _id?: string;
    title?: string;
    image?: string;
    content?: string;
    date_creation?: Date;
    date_update?: Date;
}, {
    _id?: string;
    title?: string;
    image?: string;
    content?: string;
    date_creation?: Date;
    date_update?: Date;
}>;
export type IPost = z.infer<typeof postValidationSchema>;

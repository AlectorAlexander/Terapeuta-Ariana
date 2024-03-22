import { z } from 'zod';
export declare const userValidationSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    role: z.ZodEnum<["user", "admin"]>;
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
    profile_photo: z.ZodOptional<z.ZodString>;
    google_id: z.ZodOptional<z.ZodString>;
    facebook_id: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    date_creation: z.ZodOptional<z.ZodDate>;
    date_update: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    _id?: string;
    role?: "user" | "admin";
    name?: string;
    email?: string;
    password?: string;
    profile_photo?: string;
    google_id?: string;
    facebook_id?: string;
    phone?: string;
    date_creation?: Date;
    date_update?: Date;
}, {
    _id?: string;
    role?: "user" | "admin";
    name?: string;
    email?: string;
    password?: string;
    profile_photo?: string;
    google_id?: string;
    facebook_id?: string;
    phone?: string;
    date_creation?: Date;
    date_update?: Date;
}>;
export type IUser = z.infer<typeof userValidationSchema>;

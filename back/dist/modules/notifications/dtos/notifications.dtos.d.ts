import { z } from 'zod';
export declare const notificationsValidationSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    notification_date: z.ZodOptional<z.ZodDate>;
    read: z.ZodOptional<z.ZodBoolean>;
    date_creation: z.ZodOptional<z.ZodDate>;
    date_update: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    _id?: string;
    user_id?: string;
    message?: string;
    notification_date?: Date;
    read?: boolean;
    date_creation?: Date;
    date_update?: Date;
}, {
    _id?: string;
    user_id?: string;
    message?: string;
    notification_date?: Date;
    read?: boolean;
    date_creation?: Date;
    date_update?: Date;
}>;
export type INotifications = z.infer<typeof notificationsValidationSchema>;

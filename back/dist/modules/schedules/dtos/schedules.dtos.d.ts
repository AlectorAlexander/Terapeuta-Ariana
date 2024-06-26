import { z } from 'zod';
export declare const schedulesValidationSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodString>;
    start_date: z.ZodOptional<z.ZodDate>;
    end_date: z.ZodOptional<z.ZodDate>;
    status: z.ZodEnum<["pendente", "agendado", "cancelado", "reembolsado", "concluído"]>;
    google_event_id: z.ZodOptional<z.ZodString>;
    date_creation: z.ZodOptional<z.ZodDate>;
    date_update: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    _id?: string;
    user_id?: string;
    start_date?: Date;
    end_date?: Date;
    status?: "pendente" | "cancelado" | "reembolsado" | "agendado" | "concluído";
    google_event_id?: string;
    date_creation?: Date;
    date_update?: Date;
}, {
    _id?: string;
    user_id?: string;
    start_date?: Date;
    end_date?: Date;
    status?: "pendente" | "cancelado" | "reembolsado" | "agendado" | "concluído";
    google_event_id?: string;
    date_creation?: Date;
    date_update?: Date;
}>;
export type ISchedules = z.infer<typeof schedulesValidationSchema>;

/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document, Schema } from 'mongoose';
import MongoModel from '../../MongoModel';
import { ISessions } from '../dtos/sessions.dtos';
export declare const sessionSchema: Schema<{
    _id?: string;
    schedule_id?: string;
    date?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
} & Document<any, any, any>, import("mongoose").Model<{
    _id?: string;
    schedule_id?: string;
    date?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
} & Document<any, any, any>, any, any, any, Document<unknown, any, {
    _id?: string;
    schedule_id?: string;
    date?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
} & Document<any, any, any>> & {
    _id?: string;
    schedule_id?: string;
    date?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
} & Document<any, any, any> & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    _id?: string;
    schedule_id?: string;
    date?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
} & Document<any, any, any>, Document<unknown, {}, import("mongoose").FlatRecord<{
    _id?: string;
    schedule_id?: string;
    date?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
} & Document<any, any, any>>> & import("mongoose").FlatRecord<{
    _id?: string;
    schedule_id?: string;
    date?: string;
    price?: number;
    date_creation?: Date;
    date_update?: Date;
} & Document<any, any, any>> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare class SessionsModel extends MongoModel<ISessions & Document> {
    constructor(model?: import("mongoose").Model<{
        _id?: string;
        schedule_id?: string;
        date?: string;
        price?: number;
        date_creation?: Date;
        date_update?: Date;
    } & Document<any, any, any>, {}, {}, {}, Document<unknown, {}, {
        _id?: string;
        schedule_id?: string;
        date?: string;
        price?: number;
        date_creation?: Date;
        date_update?: Date;
    } & Document<any, any, any>> & {
        _id?: string;
        schedule_id?: string;
        date?: string;
        price?: number;
        date_creation?: Date;
        date_update?: Date;
    } & Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, Schema<{
        _id?: string;
        schedule_id?: string;
        date?: string;
        price?: number;
        date_creation?: Date;
        date_update?: Date;
    } & Document<any, any, any>, import("mongoose").Model<{
        _id?: string;
        schedule_id?: string;
        date?: string;
        price?: number;
        date_creation?: Date;
        date_update?: Date;
    } & Document<any, any, any>, any, any, any, Document<unknown, any, {
        _id?: string;
        schedule_id?: string;
        date?: string;
        price?: number;
        date_creation?: Date;
        date_update?: Date;
    } & Document<any, any, any>> & {
        _id?: string;
        schedule_id?: string;
        date?: string;
        price?: number;
        date_creation?: Date;
        date_update?: Date;
    } & Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        _id?: string;
        schedule_id?: string;
        date?: string;
        price?: number;
        date_creation?: Date;
        date_update?: Date;
    } & Document<any, any, any>, Document<unknown, {}, import("mongoose").FlatRecord<{
        _id?: string;
        schedule_id?: string;
        date?: string;
        price?: number;
        date_creation?: Date;
        date_update?: Date;
    } & Document<any, any, any>>> & import("mongoose").FlatRecord<{
        _id?: string;
        schedule_id?: string;
        date?: string;
        price?: number;
        date_creation?: Date;
        date_update?: Date;
    } & Document<any, any, any>> & {
        _id: import("mongoose").Types.ObjectId;
    }>>);
}
export default SessionsModel;
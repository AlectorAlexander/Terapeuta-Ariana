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
import { Model, Document, FilterQuery } from 'mongoose';
import { IModel } from './interfaces/IModel';
declare abstract class MongoModel<T extends Document> implements IModel<T> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    create(obj: Partial<T>): Promise<T>;
    read(filter?: FilterQuery<T>): Promise<T[]>;
    readOne(_id: string): Promise<T | null>;
    readOneByEmail(email: string): Promise<T | null>;
    update(_id: string, obj: Partial<T>): Promise<T | null>;
    updateByEmail(email: string, obj: Partial<T>): Promise<T | null>;
    delete(_id: string): Promise<T | null>;
}
export default MongoModel;

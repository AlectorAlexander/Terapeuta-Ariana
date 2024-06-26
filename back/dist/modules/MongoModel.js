"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class MongoModel {
    constructor(model) {
        this.model = model;
    }
    async create(obj) {
        const createdObj = await this.model.create(obj);
        return createdObj;
    }
    async read(filter) {
        try {
            let objs;
            if (filter) {
                objs = await this.model.find(filter);
            }
            else {
                objs = await this.model.find();
            }
            return objs;
        }
        catch (error) {
            throw error;
        }
    }
    async readOne(_id) {
        if (!(0, mongoose_1.isValidObjectId)(_id)) {
            throw new Error('Invalid _id format.');
        }
        const obj = await this.model.findById(_id);
        return obj;
    }
    async readOneByEmail(email) {
        const obj = await this.model.findOne({ email });
        return obj;
    }
    async update(_id, obj) {
        if (!(0, mongoose_1.isValidObjectId)(_id)) {
            throw new Error('Invalid _id format.');
        }
        const updatedObj = await this.model.findByIdAndUpdate(_id, obj, {
            new: true,
        });
        return updatedObj;
    }
    async updateByEmail(email, obj) {
        if (!email) {
            throw new Error('Email is required.');
        }
        const updatedObj = await this.model.findOneAndUpdate({ email: email }, obj, {
            new: true,
        });
        return updatedObj;
    }
    async delete(_id) {
        if (!(0, mongoose_1.isValidObjectId)(_id)) {
            throw new Error('Invalid _id format.');
        }
        const deletedObj = await this.model.findByIdAndDelete(_id);
        return deletedObj;
    }
}
exports.default = MongoModel;
//# sourceMappingURL=MongoModel.js.map
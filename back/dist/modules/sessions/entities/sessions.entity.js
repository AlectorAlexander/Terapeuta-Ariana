"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionSchema = void 0;
const mongoose_1 = require("mongoose");
const MongoModel_1 = require("../../MongoModel");
exports.sessionSchema = new mongoose_1.Schema({
    schedule_id: { type: String, required: true },
    date: { type: String, required: true },
    price: { type: Number, required: true },
    date_creation: { type: Date, default: Date.now, required: true },
    date_update: { type: Date, default: Date.now, required: true },
});
class SessionsModel extends MongoModel_1.default {
    constructor(model = (0, mongoose_1.model)('sessions', exports.sessionSchema)) {
        super(model);
    }
}
exports.default = SessionsModel;
//# sourceMappingURL=sessions.entity.js.map
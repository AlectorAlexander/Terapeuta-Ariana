"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesSchema = void 0;
const mongoose_1 = require("mongoose");
const MongoModel_1 = require("../../MongoModel");
exports.SchedulesSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    start_date: { type: Date, required: true },
    status: { type: String, required: true },
    google_event_id: { type: String, required: false },
    end_date: { type: Date, required: true },
    date_creation: { type: Date, default: Date.now, required: true },
    date_update: { type: Date, default: Date.now, required: true },
});
class SchedulesModel extends MongoModel_1.default {
    constructor(model = (0, mongoose_1.model)('schedules', exports.SchedulesSchema)) {
        super(model);
    }
}
exports.default = SchedulesModel;
//# sourceMappingURL=schedules.entity.js.map
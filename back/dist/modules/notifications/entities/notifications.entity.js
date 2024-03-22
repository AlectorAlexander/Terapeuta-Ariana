"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
const mongoose_1 = require("mongoose");
const MongoModel_1 = require("../../MongoModel");
exports.NotificationSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    message: { type: String, required: true },
    notification_date: { type: Date, default: Date.now, required: true },
    read: { type: Boolean, default: false, required: true },
    date_creation: { type: Date, default: Date.now, required: true },
    date_update: { type: Date, default: Date.now, required: true },
});
class NotificationModel extends MongoModel_1.default {
    constructor(model = (0, mongoose_1.model)('notifications', exports.NotificationSchema)) {
        super(model);
    }
}
exports.default = NotificationModel;
//# sourceMappingURL=notifications.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsSchema = void 0;
const mongoose_1 = require("mongoose");
const MongoModel_1 = require("../../MongoModel");
exports.PaymentsSchema = new mongoose_1.Schema({
    schedule_id: { type: String, required: true },
    paymentIntentId: { type: String, required: false },
    price: { type: Number, required: true },
    status: { type: String, default: 'pendente', required: true },
    date_creation: { type: Date, default: Date.now, required: true },
    date_update: { type: Date, default: Date.now, required: true },
});
class PaymentsModel extends MongoModel_1.default {
    constructor(model = (0, mongoose_1.model)('payments', exports.PaymentsSchema)) {
        super(model);
    }
}
exports.default = PaymentsModel;
//# sourceMappingURL=payments.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
const MongoModel_1 = require("../../MongoModel");
exports.productSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    duracao: { type: String, required: true },
    price: { type: Number, required: true },
    date_creation: { type: Date, default: Date.now, required: true },
    date_update: { type: Date, default: Date.now, required: true },
    stripe_id: { type: String, required: false },
});
class productModel extends MongoModel_1.default {
    constructor(model = (0, mongoose_1.model)('products', exports.productSchema)) {
        super(model);
    }
}
exports.default = productModel;
//# sourceMappingURL=products.entity.js.map
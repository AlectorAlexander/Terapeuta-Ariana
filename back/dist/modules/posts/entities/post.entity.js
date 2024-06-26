"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const MongoModel_1 = require("../../MongoModel");
exports.postSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    date_creation: { type: Date, default: Date.now, required: true },
    date_update: { type: Date, default: Date.now, required: true },
});
class PostModel extends MongoModel_1.default {
    constructor(model = (0, mongoose_1.model)('posts', exports.postSchema)) {
        super(model);
    }
}
exports.default = PostModel;
//# sourceMappingURL=post.entity.js.map
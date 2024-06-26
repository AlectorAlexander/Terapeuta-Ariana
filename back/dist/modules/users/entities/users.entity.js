"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const MongoModel_1 = require("../../../modules/MongoModel");
exports.UserSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    profile_photo: {
        type: String,
        required: false,
    },
    google_id: {
        type: String,
        required: false,
    },
    facebook_id: {
        type: String,
        required: false,
    },
    date_creation: {
        type: Date,
        default: Date.now,
        required: true,
    },
    date_update: {
        type: Date,
        default: Date.now,
        required: false,
    },
});
class UserModel extends MongoModel_1.default {
    constructor(model = (0, mongoose_1.model)('users', exports.UserSchema)) {
        super(model);
    }
}
exports.default = UserModel;
//# sourceMappingURL=users.entity.js.map
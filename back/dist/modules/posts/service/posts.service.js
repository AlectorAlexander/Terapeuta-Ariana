"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const post_entity_1 = require("../entities/post.entity");
const post_dtos_1 = require("../dtos/post.dtos");
let PostService = class PostService {
    constructor() {
        this._post = new post_entity_1.default();
    }
    sortByDateCreation(a, b) {
        const dateA = a.date_creation || new Date(0);
        const dateB = b.date_creation || new Date(0);
        return dateA.getTime() - dateB.getTime();
    }
    async getRecentPosts(limit) {
        try {
            const postsFromDB = await this._post.read();
            const posts = postsFromDB.map((post) => (Object.assign({}, post)));
            posts.sort(this.sortByDateCreation);
            const recentPosts = posts.reverse().slice(0, limit);
            return recentPosts;
        }
        catch (error) {
            throw error;
        }
    }
    async validateDataAndCreate(data) {
        var _a;
        const parsed = post_dtos_1.postValidationSchema.safeParse(data);
        if (!parsed.success) {
            const errorDetails = parsed;
            const firstError = (_a = errorDetails.error) === null || _a === void 0 ? void 0 : _a.errors[0];
            const errorMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.message) || 'Validation error';
            const codeMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.code) || 'invalid_type';
            throw new Error(`${errorMessage} (code: ${codeMessage})`);
        }
        const post = await this._post.create(data);
        return post;
    }
    async create(data) {
        try {
            return this.validateDataAndCreate(data);
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            return await this._post.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
    async read() {
        try {
            const postsFromDB = await this._post.read();
            const posts = postsFromDB.map((post) => (Object.assign({}, post)));
            posts.sort(this.sortByDateCreation);
            return posts;
        }
        catch (error) {
            throw error;
        }
    }
    async readOne(id) {
        try {
            const post = await this._post.readOne(id);
            return post;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        var _a;
        const parsed = post_dtos_1.postValidationSchema.safeParse(data);
        if (!parsed.success) {
            const errorDetails = parsed;
            const firstError = (_a = errorDetails.error) === null || _a === void 0 ? void 0 : _a.errors[0];
            const errorMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.message) || 'Validation error';
            const codeMessage = (firstError === null || firstError === void 0 ? void 0 : firstError.code) || 'invalid_type';
            throw new Error(`${errorMessage} (code: ${codeMessage})`);
        }
        try {
            const updatedPosts = await this._post.update(id, data);
            return updatedPosts;
        }
        catch (error) {
            throw error;
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PostService);
exports.default = PostService;
//# sourceMappingURL=posts.service.js.map
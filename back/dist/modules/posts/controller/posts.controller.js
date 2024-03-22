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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../users/service/jwt-auth.guard");
const posts_service_1 = require("../service/posts.service");
let PostController = class PostController {
    constructor(PostService) {
        this.PostService = PostService;
    }
    async create(req, data) {
        try {
            const role = req.user.role;
            if (role === 'admin') {
                const post = await this.PostService.create(data);
                return post;
            }
            else {
                throw new common_1.BadRequestException({
                    message: 'Failed to create post',
                    details: 'Only admins can create posts',
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to create post',
                details: error.message,
            });
        }
    }
    async getRecentPosts(limit) {
        try {
            const recentPosts = await this.PostService.getRecentPosts(limit);
            return recentPosts;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to get recent posts',
                details: error.message,
            });
        }
    }
    async read() {
        try {
            const posts = await this.PostService.read();
            return posts;
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to read posts',
                details: error.message,
            });
        }
    }
    async readOne(id) {
        try {
            const post = await this.PostService.readOne(id);
            if (!post) {
                throw new common_1.NotFoundException('post not found');
            }
            return post;
        }
        catch (error) {
            throw new common_1.NotFoundException('post not found');
        }
    }
    async updateWithoutToken(req, id, { data, secret }) {
        try {
            if (secret === process.env.APP_SECRET_KEY) {
                const updatedPost = await this.PostService.update(id, data);
                if (!updatedPost) {
                    throw new common_1.NotFoundException('post not found');
                }
                return updatedPost;
            }
            else {
                throw new common_1.BadRequestException({
                    message: 'Failed to update post',
                    details: 'Only admins can update posts',
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to update post',
                details: error.message,
            });
        }
    }
    async update(req, id, { data, secret }) {
        try {
            const role = req.user.role;
            if (role === 'admin' || secret === process.env.APP_SECRET_KEY) {
                const updatedPost = await this.PostService.update(id, data);
                if (!updatedPost) {
                    throw new common_1.NotFoundException('post not found');
                }
                return updatedPost;
            }
            else {
                throw new common_1.BadRequestException({
                    message: 'Failed to update post',
                    details: 'Only admins can update posts',
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to update post',
                details: error.message,
            });
        }
    }
    async delete(req, id) {
        try {
            const role = req.user.role;
            if (role === 'admin') {
                const deletedPost = await this.PostService.delete(id);
                if (!deletedPost) {
                    throw new common_1.NotFoundException('post not found');
                }
                return deletedPost;
            }
            else {
                throw new common_1.BadRequestException({
                    message: 'Failed to delete post',
                    details: 'Only admins can delete posts',
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException({
                message: 'Failed to delete post',
                details: error.message,
            });
        }
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('recent/:limit'),
    __param(0, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getRecentPosts", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "read", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "readOne", null);
__decorate([
    (0, common_1.Put)('updateWithout/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updateWithoutToken", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "delete", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.default])
], PostController);
//# sourceMappingURL=posts.controller.js.map
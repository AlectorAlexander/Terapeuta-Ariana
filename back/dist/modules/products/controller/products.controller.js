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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../users/service/jwt-auth.guard");
const products_service_1 = require("../service/products.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async create(req, data) {
        try {
            const role = req.user.role;
            if (role === 'admin') {
                const product = await this.productService.create(data);
                return product;
            }
            else {
                throw new common_1.BadRequestException({
                    message: 'Failed to create product',
                    details: 'Only admins can create products',
                });
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.BadRequestException({
                    message: error.message,
                    details: error || 'An unexpected error occurred',
                });
            }
        }
    }
    async read() {
        try {
            const products = await this.productService.read();
            return products;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.BadRequestException({
                    message: error.message,
                    details: error || 'An unexpected error occurred',
                });
            }
        }
    }
    async readOne(id) {
        try {
            const product = await this.productService.readOne(id);
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return product;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.NotFoundException('Product not found');
            }
        }
    }
    async updateWithoutToken(req, id, { data, secret }) {
        try {
            if (secret === process.env.APP_SECRET_KEY) {
                const updatedProduct = await this.productService.update(id, data);
                if (!updatedProduct) {
                    throw new common_1.NotFoundException('Product not found');
                }
                return updatedProduct;
            }
            else {
                throw new common_1.BadRequestException({
                    message: 'Failed to update product',
                    details: 'Only admins can update products',
                });
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.BadRequestException({
                    message: error.message,
                    details: error || 'An unexpected error occurred',
                });
            }
        }
    }
    async update(req, id, { data, secret }) {
        try {
            const role = req.user.role;
            if (role === 'admin' || secret === process.env.APP_SECRET_KEY) {
                const updatedProduct = await this.productService.update(id, data);
                if (!updatedProduct) {
                    throw new common_1.NotFoundException('Product not found');
                }
                return updatedProduct;
            }
            else {
                throw new common_1.BadRequestException({
                    message: 'Failed to update product',
                    details: 'Only admins can update products',
                });
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.BadRequestException({
                    message: error.message,
                    details: error || 'An unexpected error occurred',
                });
            }
        }
    }
    async delete(req, id) {
        try {
            const role = req.user.role;
            if (role === 'admin') {
                const deletedProduct = await this.productService.delete(id);
                if (!deletedProduct) {
                    throw new common_1.NotFoundException('Product not found');
                }
                return deletedProduct;
            }
            else {
                throw new common_1.BadRequestException({
                    message: 'Failed to delete product',
                    details: 'Only admins can delete products',
                });
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            else {
                throw new common_1.BadRequestException({
                    message: error.message,
                    details: error || 'An unexpected error occurred',
                });
            }
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "read", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "readOne", null);
__decorate([
    (0, common_1.Put)('updateWithout/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateWithoutToken", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.default])
], ProductController);
//# sourceMappingURL=products.controller.js.map
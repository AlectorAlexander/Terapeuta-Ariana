"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsModule = void 0;
const common_1 = require("@nestjs/common");
const posts_controller_1 = require("./controller/posts.controller");
const posts_service_1 = require("./service/posts.service");
let postsModule = class postsModule {
};
exports.postsModule = postsModule;
exports.postsModule = postsModule = __decorate([
    (0, common_1.Module)({
        controllers: [posts_controller_1.PostController],
        providers: [posts_service_1.default],
    })
], postsModule);
//# sourceMappingURL=posts.module.js.map
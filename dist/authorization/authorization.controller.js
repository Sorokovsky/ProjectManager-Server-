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
exports.AuthorizationController = void 0;
const common_1 = require("@nestjs/common");
const login_user_dto_1 = require("./dto/login-user.dto");
const authorization_service_1 = require("./authorization.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const platform_express_1 = require("@nestjs/platform-express");
let AuthorizationController = class AuthorizationController {
    constructor(authorizationService) {
        this.authorizationService = authorizationService;
    }
    login(loginUserDto) {
        return this.authorizationService.login(loginUserDto);
    }
    check(headers) {
        var _a;
        const token = (_a = headers === null || headers === void 0 ? void 0 : headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return false;
        return this.authorizationService.checkToken(token);
    }
    registration(createUserDto, file) {
        console.log(file);
        return this.authorizationService.registration(createUserDto, file);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/check'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthorizationController.prototype, "check", null);
__decorate([
    (0, common_1.Post)('/registration'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "registration", null);
AuthorizationController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [authorization_service_1.AuthorizationService])
], AuthorizationController);
exports.AuthorizationController = AuthorizationController;
//# sourceMappingURL=authorization.controller.js.map
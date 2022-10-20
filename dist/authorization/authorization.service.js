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
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_2 = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken_1 = require("../helpers/generateToken");
const create_user_dto_1 = require("../users/dto/create-user.dto");
let AuthorizationService = class AuthorizationService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const cand = await this.userModel.findOne({ email });
        if (!cand)
            throw new common_1.HttpException("User undefined", common_1.HttpStatus.BAD_REQUEST);
        if (bcrypt.compareSync(password, cand.password)) {
            const token = (0, generateToken_1.generateToken)({ id: cand._id });
            return { token };
        }
        else {
            throw new common_1.HttpException("Password wrong", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    checkToken(token) {
        try {
            jwt.verify(token, process.env.SECRET_KEY);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async registration(createUserDto) {
        const cand = await this.userModel.findOne({ email: createUserDto.email });
        if (cand)
            throw new common_1.HttpException('Email have to be a unique', common_1.HttpStatus.BAD_REQUEST);
        const hashedPassword = bcrypt.hashSync(createUserDto.password, 7);
        try {
            const user = await this.userModel.create(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
            const token = (0, generateToken_1.generateToken)({ id: user._id });
            return token;
        }
        catch (e) {
            throw new common_1.HttpException("DataBase error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthorizationService.prototype, "registration", null);
AuthorizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthorizationService);
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.service.js.map
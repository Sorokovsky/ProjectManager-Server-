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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const jwt = require("jsonwebtoken");
const link_schema_1 = require("../schemas/link.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel, linkModel) {
        this.userModel = userModel;
        this.linkModel = linkModel;
    }
    async getAll() {
        return await this.userModel.find();
    }
    async getOneByToken(token) {
        if (!token)
            throw new common_1.HttpException('No Token', common_1.HttpStatus.BAD_REQUEST);
        try {
            const payload = jwt.verify(token, process.env.SECRET_KEY);
            console.log(payload);
            if (!payload)
                throw new common_1.HttpException('Token was die', common_1.HttpStatus.BAD_REQUEST);
            const user = await this.userModel.findById(payload.id);
            if (!user)
                throw new common_1.HttpException('User undefined', common_1.HttpStatus.BAD_REQUEST);
            return user;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getOne(id) {
        const user = await this.userModel.findById(id).populate('links');
        if (!user)
            throw new common_1.HttpException("User undefined", common_1.HttpStatus.BAD_REQUEST);
        return user;
    }
    async delete(id) {
        try {
            return await this.userModel.findByIdAndDelete(id);
        }
        catch (e) {
            throw new common_1.HttpException("Client not found", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, updateUserDto) {
        try {
            const hashedPassword = bcrypt.hashSync(updateUserDto.password, 7);
            return await this.userModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, updateUserDto), { password: hashedPassword }), { new: true });
        }
        catch (e) {
            throw new common_1.HttpException("Email have to be a unique", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(link_schema_1.Link.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
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
exports.LinksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const link_schema_1 = require("../schemas/link.schema");
const user_schema_1 = require("../schemas/user.schema");
let LinksService = class LinksService {
    constructor(linkModel, userModel) {
        this.linkModel = linkModel;
        this.userModel = userModel;
    }
    async getAll() {
        return await this.linkModel.find();
    }
    async getOne(id) {
        try {
            const link = await this.linkModel.findById(id);
            return link;
        }
        catch (e) {
            throw new common_1.HttpException("Link not found", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(userId, createLinkDto) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.HttpException(`User undefined`, common_1.HttpStatus.BAD_REQUEST);
        try {
            const link = await this.linkModel.create(Object.assign(Object.assign({}, createLinkDto), { user: userId }));
            user.links.push(link);
            await user.save();
            return link;
        }
        catch (e) {
            throw new common_1.HttpException("Data Base Error", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
LinksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(link_schema_1.Link.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], LinksService);
exports.LinksService = LinksService;
//# sourceMappingURL=links.service.js.map
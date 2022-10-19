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
exports.LinksController = void 0;
const common_1 = require("@nestjs/common");
const links_service_1 = require("./links.service");
const mongoose_1 = require("mongoose");
const create_link_dto_1 = require("./dto/create-link.dto");
let LinksController = class LinksController {
    constructor(linksService) {
        this.linksService = linksService;
    }
    getAll() {
        return this.linksService.getAll();
    }
    getOne(id) {
        return this.linksService.getOne(id);
    }
    create(userId, createLinkDto) {
        return this.linksService.create(userId, createLinkDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.default.Schema.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.default.Schema.Types.ObjectId, create_link_dto_1.CreateLinkDto]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "create", null);
LinksController = __decorate([
    (0, common_1.Controller)('/links'),
    __metadata("design:paramtypes", [links_service_1.LinksService])
], LinksController);
exports.LinksController = LinksController;
//# sourceMappingURL=links.controller.js.map
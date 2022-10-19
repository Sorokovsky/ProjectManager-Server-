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
exports.LinkSchema = exports.Link = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
let Link = class Link {
};
__decorate([
    (0, mongoose_1.Prop)({ unique: false, isRequired: true }),
    __metadata("design:type", String)
], Link.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: false, isRequired: false }),
    __metadata("design:type", String)
], Link.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: false, isRequired: false }),
    __metadata("design:type", String)
], Link.prototype, "preview", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: false, isRequired: true }),
    __metadata("design:type", String)
], Link.prototype, "href", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' } }),
    __metadata("design:type", user_schema_1.User)
], Link.prototype, "user", void 0);
Link = __decorate([
    (0, mongoose_1.Schema)()
], Link);
exports.Link = Link;
exports.LinkSchema = mongoose_1.SchemaFactory.createForClass(Link);
//# sourceMappingURL=link.schema.js.map
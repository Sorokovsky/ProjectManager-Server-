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
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken_1 = require("../helpers/generateToken");
const mongoose_2 = require("mongoose");
const path = require("path");
const fs = require("fs/promises");
const fs_1 = require("fs");
const uuid = require("uuid");
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
            const data = jwt.verify(token, process.env.SECRET_KEY);
            return data;
        }
        catch (e) {
            return false;
        }
    }
    async registration(createUserDto, file) {
        const cand = await this.userModel.findOne({ email: createUserDto.email });
        if (cand)
            throw new common_1.HttpException('Email have to be a unique', common_1.HttpStatus.BAD_REQUEST);
        const hashedPassword = bcrypt.hashSync(createUserDto.password, 7);
        const { mimetype, buffer, originalname } = file;
        const imageRegExp = new RegExp('image', 'i');
        const isImage = imageRegExp.test(mimetype);
        if (!isImage)
            throw new common_1.HttpException(`Avatar have to be a image`, common_1.HttpStatus.BAD_REQUEST);
        const extName = originalname.split('.')[1];
        const filePath = path.resolve(__dirname, '..', 'static');
        const fileName = uuid.v4() + '.' + extName;
        if (!(0, fs_1.existsSync)(filePath)) {
            await fs.mkdir(filePath, { recursive: true });
        }
        await fs.writeFile(path.resolve(filePath, fileName), buffer);
        try {
            const user = await this.userModel.create(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword, avatar: fileName }));
            const token = (0, generateToken_1.generateToken)({ id: user._id });
            return token;
        }
        catch (e) {
            throw new common_1.HttpException("DataBase error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AuthorizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthorizationService);
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.service.js.map
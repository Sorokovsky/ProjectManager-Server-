/// <reference types="multer" />
import { LoginUserDto } from "./dto/login-user.dto";
import { UserDocument } from "../schemas/user.schema";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Model } from "mongoose";
export declare class AuthorizationService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    checkToken(token: string): boolean;
    registration(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<string>;
}

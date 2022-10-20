import { LoginUserDto } from "./dto/login-user.dto";
import { UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "../users/dto/create-user.dto";
export declare class AuthorizationService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    checkToken(token: string): boolean;
    registration(createUserDto: CreateUserDto): Promise<string>;
}

import { LoginUserDto } from "./dto/login-user.dto";
import { UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
export declare class AuthorizationService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
}

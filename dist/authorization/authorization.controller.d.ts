/// <reference types="multer" />
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthorizationService } from "./authorization.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
export declare class AuthorizationController {
    private authorizationService;
    constructor(authorizationService: AuthorizationService);
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    check(headers: any): string | import("jsonwebtoken").JwtPayload;
    registration(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<string>;
}

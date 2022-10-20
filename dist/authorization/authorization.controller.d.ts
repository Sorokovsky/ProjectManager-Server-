import { LoginUserDto } from "./dto/login-user.dto";
import { AuthorizationService } from "./authorization.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
export declare class AuthorizationController {
    private authorizationService;
    constructor(authorizationService: AuthorizationService);
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
    check(headers: any): boolean;
    registration(createUserDto: CreateUserDto): Promise<string>;
}
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthorizationService } from "./authorization.service";
export declare class AuthorizationController {
    private authorizationService;
    constructor(authorizationService: AuthorizationService);
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
    }>;
}

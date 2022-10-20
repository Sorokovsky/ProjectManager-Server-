import { Controller, Post } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthorizationService } from "./authorization.service";
@Controller('/auth')
export class AuthorizationController{
  constructor(private authorizationService:AuthorizationService) {}
  @Post('/login')
  login(loginUserDto:LoginUserDto):Promise<{token:string}>{
    return this.authorizationService.login(loginUserDto);
  }
}
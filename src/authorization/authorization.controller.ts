import { Controller, Get, Post, Headers, Body } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthorizationService } from "./authorization.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
@Controller('auth')
export class AuthorizationController{
  constructor(private authorizationService:AuthorizationService) {}
  @Post('/login')
  login(@Body() loginUserDto:LoginUserDto):Promise<{token:string}>{
    return this.authorizationService.login(loginUserDto);
  }
  @Get('/check')
  check(@Headers() headers){
    const token:string = headers?.authorization?.split(' ')[1];
    if (!token) return false;
    return this.authorizationService.checkToken(token);
  }
  @Post('/registration')
  registration(@Body() createUserDto:CreateUserDto):Promise<string>{
    return this.authorizationService.registration(createUserDto);
  }
}
import { Controller, Get, Post, Headers, Body, UseInterceptors, UploadedFile, HttpStatus, HttpException } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthorizationService } from "./authorization.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
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
    if (!token) throw new HttpException('Token died', HttpStatus.BAD_REQUEST);
    return this.authorizationService.checkToken(token);
  }
  @Post('/registration')
  @UseInterceptors(FileInterceptor('avatar'))
  registration(@Body() createUserDto:CreateUserDto, @UploadedFile() file:Express.Multer.File):Promise<string>{
    console.log(file);
    return this.authorizationService.registration(createUserDto, file);
  }
}
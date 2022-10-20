import { Body, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { generateToken } from "../helpers/generateToken";
import { CreateUserDto } from "../users/dto/create-user.dto";
@Injectable()
export class AuthorizationService{
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async login(loginUserDto:LoginUserDto):Promise<{token:string}>{
    const { email, password } = loginUserDto;
    const cand:User|null = await this.userModel.findOne({email});
    if (!cand) throw new HttpException("User undefined", HttpStatus.BAD_REQUEST);
    if (bcrypt.compareSync(password, cand.password)){
      const token:string = generateToken({ id:cand._id });
      return {token};
    }else{
      throw new HttpException("Password wrong", HttpStatus.BAD_REQUEST);
    }
  }
  checkToken(token:string):boolean{
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      return true;
    }catch (e){
      return false;
    }
  }
  async registration(@Body() createUserDto:CreateUserDto):Promise<string> {
    const cand:User|null = await this.userModel.findOne({email: createUserDto.email});
    if(cand) throw new HttpException('Email have to be a unique', HttpStatus.BAD_REQUEST);
    const hashedPassword:string = bcrypt.hashSync(createUserDto.password, 7);
    try {
      const user:User = await this.userModel.create({...createUserDto, password:hashedPassword});
      const token = generateToken({id: user._id});
      return token;
    }catch (e) {
      throw new HttpException("DataBase error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
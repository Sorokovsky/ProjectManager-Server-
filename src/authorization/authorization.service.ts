import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { generateToken } from "../helpers/generateToken";
@Injectable()
export class AuthorizationService{
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async login(loginUserDto:LoginUserDto):Promise<{token:string}>{
    const { email, password } = loginUserDto;
    const cand:User|null = await this.userModel.findOne({email});
    if (!cand) throw new HttpException("User undefined", HttpStatus.BAD_REQUEST);
    if (bcrypt.compareSync(password, cand.password)){
      const token:string = generateToken(cand);
      return {token};
    }
  }
}
import { Body, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { generateToken } from "../helpers/generateToken";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Token } from "../types/Token";
import { Model } from "mongoose";
import * as path from "path";
import * as fs from "fs/promises";
import { existsSync } from "fs";
import * as uuid from 'uuid';
@Injectable()
export class AuthorizationService{
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async login(loginUserDto:LoginUserDto):Promise<{token:string}>{
    const { email, password } = loginUserDto;
    const cand:User|null = await this.userModel.findOne({email});
    if (!cand) throw new HttpException("User undefined", HttpStatus.BAD_REQUEST);
    if (bcrypt.compareSync(password, cand.password)){
      const token:string = generateToken<Token>({ id:cand._id });
      return {token};
    }else{
      throw new HttpException("Password wrong", HttpStatus.BAD_REQUEST);
    }
  }
  checkToken(token:string){
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      return data;
    }catch (e){
      throw new HttpException('Token died', HttpStatus.BAD_REQUEST);
    }
  }
  async registration(createUserDto:CreateUserDto, file:Express.Multer.File):Promise<string> {
    const cand:User|null = await this.userModel.findOne({email: createUserDto.email});
    if(cand) throw new HttpException('Email have to be a unique', HttpStatus.BAD_REQUEST);
    const hashedPassword:string = bcrypt.hashSync(createUserDto.password, 7);
    const {mimetype, buffer, originalname} = file;
    const imageRegExp = new RegExp('image', 'i');
    const isImage = imageRegExp.test(mimetype);
    if (!isImage) throw new HttpException(`Avatar have to be a image`, HttpStatus.BAD_REQUEST);
    const extName:string = originalname.split('.')[1];
    const filePath:string = path.resolve(__dirname, '..', 'static');
    const fileName:string = uuid.v4() + '.' + extName;
    if (!existsSync(filePath)) {
      await fs.mkdir(filePath, { recursive:true })
    }
    await fs.writeFile(path.resolve(filePath, fileName), buffer);
    try {
      const user:User = await this.userModel.create({...createUserDto, password:hashedPassword, avatar: fileName});
      const token = generateToken<Token>({id: user._id});
      return token;
    }catch (e) {
      throw new HttpException("DataBase error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
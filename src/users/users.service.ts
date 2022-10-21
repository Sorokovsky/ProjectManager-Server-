import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import * as jwt from 'jsonwebtoken';
import { UpdateUserDto } from "./dto/update-user.dto";
import { Link } from "../schemas/link.schema";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Link.name) private linkModel: Model<UserDocument>){}
    async getAll():Promise<User[]>{
        return await this.userModel.find();
    }
    async getOneByToken(token:string):Promise<User>{
        if (!token) throw new HttpException('No Token', HttpStatus.BAD_REQUEST);
        try {
            const payload:any = jwt.verify(token, process.env.SECRET_KEY);
            console.log(payload);
            if (!payload) throw new HttpException('Token was die', HttpStatus.BAD_REQUEST);
            const user:User|null = await this.userModel.findById(payload.id);
            if (!user) throw new HttpException('User undefined', HttpStatus.BAD_REQUEST);
            return user;
        }catch (e){
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
    async getOne(id:mongoose.Schema.Types.ObjectId):Promise<User> {
        const user:User|null = await this.userModel.findById(id).populate('links');
        if(!user) throw new HttpException("User undefined", HttpStatus.BAD_REQUEST);
        return user;
    }
    async delete(id:mongoose.Schema.Types.ObjectId):Promise<User>{
        try {
            return await this.userModel.findByIdAndDelete(id);
        }catch (e){
            throw new HttpException("Client not found", HttpStatus.BAD_REQUEST);
        }
    }
    async update(id:mongoose.Schema.Types.ObjectId, updateUserDto:UpdateUserDto):Promise<User>{
        try{
            const hashedPassword:string = bcrypt.hashSync(updateUserDto.password, 7);
            return await this.userModel.findByIdAndUpdate(id, {...updateUserDto, password:hashedPassword}, {new:true});
        }catch (e) {
            throw new HttpException("Email have to be a unique", HttpStatus.BAD_REQUEST);
        }
    }
}
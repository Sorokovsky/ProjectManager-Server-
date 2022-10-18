import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {User, UserDocument} from "src/schemas/user.schema";
import mongoose from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    async getAll():Promise<User[]>{
        return await this.userModel.find();
    }
    async getOne(id:mongoose.Schema.Types.ObjectId):Promise<User> {
        try {
            const user:User = await this.userModel.findById(id);
            return user;
        }
        catch (e) {
            throw new HttpException("User undefined", HttpStatus.BAD_REQUEST);
        }
    }
    async create(createUserDto:CreateUserDto):Promise<User>{
        const candidate:User|null = await this.userModel.findOne({email:createUserDto.email});
        if (candidate){
            throw new HttpException("Email have to be a unique", HttpStatus.BAD_REQUEST);
        }
        try {
            const user:User = await this.userModel.create(createUserDto);
            return user;
        }catch (e) {
            throw new HttpException("Data Base error", HttpStatus.UNAUTHORIZED);
        }
    }
    async delete(id:string):Promise<string>{
        return `Deleted user ${id}`;
    }
}
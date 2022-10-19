import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    async getAll():Promise<User[]>{
        return await this.userModel.find();
    }
    async getOne(email:string):Promise<User> {
        try {
            const user:User = await this.userModel.findOne({email:email});
            if(!user) throw new HttpException("User undefined", HttpStatus.BAD_REQUEST);
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
            return await this.userModel.create(createUserDto);
        }catch (e) {
            throw new HttpException("Data Base error", HttpStatus.UNAUTHORIZED);
        }
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
            return await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true});
        }catch (e) {
            throw new HttpException("Email have to be a unique", HttpStatus.BAD_REQUEST);
        }
    }
}
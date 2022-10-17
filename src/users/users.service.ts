import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { GetUserDto } from "./dto/get-user.dto";
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
    async getAll():Promise<GetUserDto[]>{
        return await this.userModel.find();
    }
    async getOne(id:string):Promise<string>{
        return `User ${id}`;
    }
    async create():Promise<string>{
        return `Created user`;
    }
    async delete(id:string):Promise<string>{
        return `Deleted user ${id}`;
    }
}
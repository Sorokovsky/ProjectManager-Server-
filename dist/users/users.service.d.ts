import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import mongoose from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getAll(): Promise<User[]>;
    getOne(id: mongoose.Schema.Types.ObjectId): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    delete(id: string): Promise<string>;
}

import mongoose, { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getAll(): Promise<User[]>;
    getOne(email: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    delete(id: mongoose.Schema.Types.ObjectId): Promise<User>;
    update(id: mongoose.Schema.Types.ObjectId, updateUserDto: UpdateUserDto): Promise<User>;
}

import mongoose, { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private userModel;
    private linkModel;
    constructor(userModel: Model<UserDocument>, linkModel: Model<UserDocument>);
    getAll(): Promise<User[]>;
    getOneByToken(token: string): Promise<User>;
    getOne(id: mongoose.Schema.Types.ObjectId): Promise<User>;
    delete(id: mongoose.Schema.Types.ObjectId): Promise<User>;
    update(id: mongoose.Schema.Types.ObjectId, updateUserDto: UpdateUserDto): Promise<User>;
}

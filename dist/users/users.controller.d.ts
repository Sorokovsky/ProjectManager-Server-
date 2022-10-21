import * as mongoose from "mongoose";
import { UsersService } from "./users.service";
import { User } from "../schemas/user.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<User[]>;
    getOneByToken(headers: any): Promise<User>;
    getOne(id: mongoose.Schema.Types.ObjectId): Promise<User>;
    delete(id: mongoose.Schema.Types.ObjectId): Promise<User>;
    update(id: mongoose.Schema.Types.ObjectId, updateUserDto: UpdateUserDto): Promise<User>;
}

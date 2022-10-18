import * as mongoose from "mongoose";
import { UsersService } from "./users.service";
import { User } from "../schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<User[]>;
    getOne(id: mongoose.Schema.Types.ObjectId): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    delete(id: string): Promise<string>;
}

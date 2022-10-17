import { Model } from "mongoose";
import { UserDocument } from "src/schemas/user.schema";
import { GetUserDto } from "./dto/get-user.dto";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getAll(): Promise<GetUserDto[]>;
    getOne(id: string): Promise<string>;
    create(): Promise<string>;
    delete(id: string): Promise<string>;
}

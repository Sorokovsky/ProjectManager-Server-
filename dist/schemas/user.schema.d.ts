import mongoose, { Document } from 'mongoose';
import { Link } from "./link.schema";
export declare type UserDocument = User & Document;
export declare class User {
    surname: string;
    name: string;
    password: string;
    email: string;
    avatar: string;
    links: Link[];
    _id: import("mongoose").Schema.Types.ObjectId;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;

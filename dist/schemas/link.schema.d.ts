import mongoose, { Document } from 'mongoose';
import { User } from "./user.schema";
export declare type LinkDocument = Link & Document;
export declare class Link {
    name: string;
    description: string;
    preview: string;
    href: string;
    user: User;
    _id: import("mongoose").Schema.Types.ObjectId;
}
export declare const LinkSchema: mongoose.Schema<Link, mongoose.Model<Link, any, any, any, any>, {}, {}, {}, {}, "type", Link>;

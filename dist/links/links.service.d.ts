import mongoose, { Model } from "mongoose";
import { Link, LinkDocument } from "../schemas/link.schema";
import { CreateLinkDto } from "./dto/create-link.dto";
import { UserDocument } from "../schemas/user.schema";
export declare class LinksService {
    private linkModel;
    private userModel;
    constructor(linkModel: Model<LinkDocument>, userModel: Model<UserDocument>);
    getAll(): Promise<Link[]>;
    getOne(id: mongoose.Schema.Types.ObjectId): Promise<Link>;
    create(userId: mongoose.Schema.Types.ObjectId, createLinkDto: CreateLinkDto): Promise<Link>;
}

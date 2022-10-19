import { Link } from "../schemas/link.schema";
import { LinksService } from "./links.service";
import mongoose from "mongoose";
import { CreateLinkDto } from "./dto/create-link.dto";
export declare class LinksController {
    private linksService;
    constructor(linksService: LinksService);
    getAll(): Promise<Link[]>;
    getOne(id: mongoose.Schema.Types.ObjectId): Promise<Link>;
    create(userId: mongoose.Schema.Types.ObjectId, createLinkDto: CreateLinkDto): Promise<Link>;
}

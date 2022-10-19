import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Link, LinkDocument } from "../schemas/link.schema";
import { CreateLinkDto } from "./dto/create-link.dto";
import { User, UserDocument } from "../schemas/user.schema";
@Injectable()
export class LinksService {
  constructor(@InjectModel(Link.name) private linkModel: Model<LinkDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {
  }
  async getAll():Promise<Link[]>{
    return await this.linkModel.find();
  }
  async getOne(id:mongoose.Schema.Types.ObjectId):Promise<Link>{
    try {
      const link:Link = await this.linkModel.findById(id);
      return link;
    }catch (e) {
      throw new HttpException("Link not found", HttpStatus.BAD_REQUEST);
    }
  }
  async create(userId:mongoose.Schema.Types.ObjectId, createLinkDto:CreateLinkDto):Promise<Link>{
    const user:UserDocument|null = await this.userModel.findById(userId);
    if (!user) throw new HttpException(`User undefined`, HttpStatus.BAD_REQUEST);
    try {
      const link:Link = await this.linkModel.create({...createLinkDto, user: userId});
      user.links.push(link);
      await user.save();
      return link;
    }catch (e) {
      throw new HttpException("Data Base Error", HttpStatus.UNAUTHORIZED);
    }
  }
}
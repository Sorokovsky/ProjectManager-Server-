import { Body, Controller, Get, HttpException, Param, Post } from "@nestjs/common";
import { Link } from "../schemas/link.schema";
import { LinksService } from "./links.service";
import mongoose from "mongoose";
import { CreateLinkDto } from "./dto/create-link.dto";
@Controller('/links')
export class LinksController {
  constructor(private linksService:LinksService) {
  }
  @Get()
  getAll():Promise<Link[]>{
    return this.linksService.getAll();
  }
  @Get('/:id')
  getOne(@Param('id') id:mongoose.Schema.Types.ObjectId):Promise<Link>{
    return this.linksService.getOne(id);
  }
  @Post('/:id')
  create(@Param('id') userId:mongoose.Schema.Types.ObjectId, @Body() createLinkDto:CreateLinkDto):Promise<Link>{
    return this.linksService.create(userId, createLinkDto);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import * as mongoose from "mongoose";
import { UsersService } from "./users.service";
import {User} from "../schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
@Controller("/users")
export class UsersController{
    constructor(private usersService:UsersService){}
    @Get()
    getAll():Promise<User[]>{
        return this.usersService.getAll();
    }
    @Get('/:id')
    getOne(@Param("id") id:mongoose.Schema.Types.ObjectId):Promise<User>{
        return this.usersService.getOne(id);
    }
    @Post()
    create(@Body() createUserDto:CreateUserDto):Promise<User>{
        return this.usersService.create(createUserDto);
    }
    @Delete('/:id')
    delete(@Param('id') id:mongoose.Schema.Types.ObjectId):Promise<User>{
        return this.usersService.delete(id);
    }
    @Put('/:id')
    update(@Param('id') id:mongoose.Schema.Types.ObjectId, @Body() updateUserDto:UpdateUserDto):Promise<User>{
        return this.usersService.update(id, updateUserDto);
    }
}
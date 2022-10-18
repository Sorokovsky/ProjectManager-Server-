import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import * as mongoose from "mongoose";
import { UsersService } from "./users.service";
import {User} from "../schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
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
    delete(@Param('id') id:string):Promise<string>{
        return this.usersService.delete(id);
    }
}
import { Body, Controller, Delete, Get, Param, Headers, Put } from "@nestjs/common";
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
    @Get('/token')
    getOneByToken(@Headers() headers){
        return this.usersService.getOneByToken(headers.authorization.split(" ")[1]);
    }
    @Get('/:id')
    getOne(@Param("id") id:mongoose.Schema.Types.ObjectId):Promise<User> {
        return this.usersService.getOne(id);
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
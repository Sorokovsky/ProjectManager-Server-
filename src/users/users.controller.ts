import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { GetUserDto } from "./dto/get-user.dto";
import { UsersService } from "./users.service";
@Controller("/users")
export class UsersController{
    constructor(private usersService:UsersService){}
    @Get()
    getAll():Promise<GetUserDto[]>{
        return this.usersService.getAll();
    }
    @Get('/:id')
    getOne(@Param("id") id:string):Promise<string>{
        return this.usersService.getOne(id);
    }
    @Post()
    create():Promise<string>{
        return this.usersService.create();
    }
    @Delete('/:id')
    delete(@Param('id') id:string):Promise<string>{
        return this.usersService.delete(id);
    }
}
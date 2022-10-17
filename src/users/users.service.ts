import { Injectable } from "@nestjs/common";
@Injectable()
export class UsersService {
    async getAll():Promise<string>{
        return `Users`;
    }
    async getOne(id:string):Promise<string>{
        return `User ${id}`;
    }
    async create():Promise<string>{
        return `Created user`;
    }
    async delete(id:string):Promise<string>{
        return `Deleted user ${id}`;
    }
}
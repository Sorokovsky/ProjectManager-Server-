import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<string>;
    getOne(id: string): Promise<string>;
    create(): Promise<string>;
    delete(id: string): Promise<string>;
}

export declare class UsersService {
    getAll(): Promise<string>;
    getOne(id: string): Promise<string>;
    create(): Promise<string>;
    delete(id: string): Promise<string>;
}

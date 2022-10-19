import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Link, LinkSchema } from "../schemas/link.schema";
@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
              MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
              MongooseModule.forFeature([{name: Link.name, schema: LinkSchema}])]
})
export class UsersModule{};
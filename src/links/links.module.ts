import { Module } from "@nestjs/common";
import { LinksController } from "./links.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Link, LinkSchema } from "../schemas/link.schema";
import { LinksService } from "./links.service";
import { User, UserSchema } from "../schemas/user.schema";
@Module({
  controllers: [LinksController],
  imports: [
            MongooseModule.forFeature([{name: Link.name, schema: LinkSchema}]),
            MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  providers: [LinksService]
})
export class LinksModule{}
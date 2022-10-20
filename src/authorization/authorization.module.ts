import { Module } from "@nestjs/common";
import { AuthorizationController } from "./authorization.controller";
import { AuthorizationService } from "./authorization.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])]
})
export class AuthorizationModule{

}
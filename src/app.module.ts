import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { LinksModule } from "./links/links.module";
import { config } from "dotenv";
config();
@Module({
    imports: [UsersModule,
              LinksModule,
              MongooseModule.forRoot(process.env.DATA_BASE_LINK)]
})
export class AppModule {};
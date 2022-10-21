import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { LinksModule } from "./links/links.module";
import { config } from "dotenv";
import { AuthorizationModule } from "./authorization/authorization.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
config();
@Module({
    imports: [UsersModule,
              ServeStaticModule.forRoot({rootPath: path.resolve(__dirname ,'static')}),
              LinksModule,
              AuthorizationModule,
              MongooseModule.forRoot(process.env.DATA_BASE_LINK)]
})
export class AppModule {};
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
@Module({
    imports: [UsersModule, MongooseModule.forRoot('mongodb+srv://Sorokovsky:sorokovsky17@cluster0.v1qg36l.mongodb.net/?retryWrites=true&w=majority')]
})
export class AppModule {}
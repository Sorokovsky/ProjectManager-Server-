import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";
import { AppModule } from "./app.module";
async function start():Promise<void>{
    config()
    const PORT:number = +process.env.PORT || 5001;
    const app:INestApplication = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`));
}
start();
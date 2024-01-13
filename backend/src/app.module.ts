import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

const DB_NAME = process.env.DB_NAME

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
        MongooseModule.forRoot(`mongodb://127.0.0.1:27017/${DB_NAME}`),
        TrackModule,
        FileModule
    ],
})

export class AppModule { }
import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { ObjectId } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller('/tracks')

export class TrackController {
    constructor(private trackService: TrackService) { }

    @Post('/add')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(
        @UploadedFiles() files,
        @Body() dto: CreateTrackDto
    ) {
        try {
            const { picture, audio } = files

            return this.trackService.create(dto, picture[0], audio[0])
        } catch (error) {
            throw error
        }
    }

    @Get('/search')
    search(@Query('query') query: string) {
        try {
            return this.trackService.search(query)
        } catch (error) {
            throw error
        }
    }

    @Get('/all')
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        try {
            return this.trackService.getAll(count, offset)
        } catch (error) {
            throw error
        }
    }

    @Get('/all/:id')
    getOne(@Param('id') id: ObjectId) {
        try {
            return this.trackService.getOne(id)
        } catch (error) {
            throw error
        }
    }

    @Delete('/delete/:id')
    delete(@Param('id') id: ObjectId) {
        try {
            return this.trackService.delete(id)
        } catch (error) {
            throw error
        }
    }

    @Post('/comment/add')
    addComment(@Body() dto: CreateCommentDto) {
        try {
            return this.trackService.addComment(dto)
        } catch (error) {
            throw error
        }
    }
}
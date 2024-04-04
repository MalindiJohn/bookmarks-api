import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    //import the service  to use its functions
    constructor(private bookmarkService: BookmarkService) { }

    //get all bookmarks
    @Get()
    getBookmarks(@GetUser('id') userId: number) {

        return this.bookmarkService.getBookmarks(userId);
    }

    //create  a new bookmark
    @Post()
    createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto
    ) {

        return this.bookmarkService.createBookmark(userId, dto);

    }

    //get a bookmark by id
    @Get(':id')
    getBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) {

        return this.bookmarkService.getBookmarkById(userId, bookmarkId);

    }

    //edit a bookmark by id
    @Patch(':id')
    editBookmarkById(
        @GetUser('id') userId: number,
        @Body() dto: EditBookmarkDto,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) {

        return this.bookmarkService.editBookmarkById(userId, dto, bookmarkId);
    }

    //delete a bookmark by id
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ) {

        return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);

    }


}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {

    //import primsa via dependency injection
    constructor(private prisma: PrismaService) { }

    //get all bookmarks
    getBookmarks(userId: number) {

        return this.prisma.bookmark.findMany({
            where: { userId },
        });
    }

    //create  a new bookmark
    async createBookmark(
        userId: number,
        dto: CreateBookmarkDto
    ) {

        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto,
            }
        })

        return bookmark;
    }

    //get a bookmark by id
    getBookmarkById(
        userId: number,
        bookmarkId: number
    ) {

        return this.prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId
            },
        });
    }

    //edit a bookmark by id
    async editBookmarkById(
        userId: number,
        dto: EditBookmarkDto,
        bookmarkId: number
    ) {

        // get the bookmark by id
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })

        //check if user owns the bookmark
        if (!bookmark || bookmark.userId !== userId)
            //throw a forbidden exception with message'Access to the resource denied'
            throw new ForbiddenException('Access to the resource is denied');


        return this.prisma.bookmark.update({
            where: {
                id: bookmarkId,
            },
            data: {
                ...dto
            }
        })

    }

    //delete a bookmark by id
    async deleteBookmarkById(
        userId: number,
        bookmarkId: number
    ) {

        // get the bookmark by id
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        })

        //check if the user owns the bookmark
        //check if user owns the bookmark
        if (!bookmark || bookmark.userId !== userId)
            //throw a forbidden exception with message'Access to the resource denied'
            throw new ForbiddenException('Access to the resource is denied');

        //delete the bookmark
        await this.prisma.bookmark.delete({
            where: {
                id: bookmarkId
            }
        })

        const response = {
            "message": `The bookmark was successfully deleted`,
        };

        return response;
    }
}

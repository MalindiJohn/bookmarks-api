/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    // url: process.env.DATABASE_URL
                    url: "postgresql://postgres:password@localhost:5434/bookmark-db?schema=public"
                },
            }
        });
    }
}

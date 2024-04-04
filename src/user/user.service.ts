import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {

    //dependency injection of other services needed
    constructor(private prisma: PrismaService) { }

    //update or edit user
    async editUser(userId: number, dto: EditUserDto) {

        //update user
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...dto,
            }
        });

        delete user.hash;

        return user;
    }
}

/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('profile')
    userProfile(@GetUser() user: User) {

        // console.log({email});

        return user;
    }

    //edit user
    @Patch()
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {

        return this.userService.editUser(userId, dto);
    }

}

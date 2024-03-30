/* eslint-disable prettier/prettier */
import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    @Get('profile')
    userProfile(@CurrentUser() user: User ){

        // console.log({email});

        return user;
    }

    //edit user
    @Patch()
    editUser(){
        
    }
    
}

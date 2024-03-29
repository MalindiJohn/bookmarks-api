/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService){}

    //login
    login(){

        return {msg: "I have logged in"};
    }

    //sign up
    signup(){

        return {msg:"I have created an account"};
    }
}

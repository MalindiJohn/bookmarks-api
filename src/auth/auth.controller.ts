/* eslint-disable prettier/prettier */
import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    //injecting auth service
    constructor(private authService: AuthService ) {}

    //create account endpoint
    @Post('signup')
    signup(@Body() dto: any){

        console.log({
            dto,
        });

        return this.authService.signup();

    }

    //login endpoint
    @Post('login')
    signin(){

        return this.authService.login();

    }

}

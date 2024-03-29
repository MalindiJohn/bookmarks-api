/* eslint-disable prettier/prettier */
import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {

    //injecting auth service
    constructor(private authService: AuthService ) {}

    //create account endpoint
    @Post('signup')
    signup(@Body() dto: AuthDto){

        return this.authService.signup(dto);

    }

    //login endpoint
    @Post('login')
    signin(@Body() dto: AuthDto) {

        return this.authService.login(dto);

    }

}

/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Post,
    Get,
    Request,
    Res,
    UseGuards,
    ValidationPipe,
    HttpStatus,
} from '@nestjs/common';

import {AuthService} from '../auth.service';
import {AuthCredentialsDto} from '../dto/auth-credentials.dto';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import {Response} from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    findAll(@Res({passthrough: true}) res: Response) {
        res.status(HttpStatus.OK);
        return [];
    }

    @Post('signup')
    async signUp(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
        @Res() res: Response,
    ): Promise<any> {
        const register = await this.authService.signUp(authCredentialsDto);
        console.log(register);

        return res.status(HttpStatus.CREATED).send(register);
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req) {
        return await this.authService.signIn(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
        return req.user;
    }
}

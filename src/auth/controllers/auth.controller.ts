/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  Response,
  UseGuards,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from '../auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { LocalAuthGuard } from '../guards/auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    @Response() res: any
  ): Promise<void> {
    const register = await this.authService.signUp(authCredentialsDto);
    return res.status(HttpStatus.OK).json(register);
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

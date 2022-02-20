/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from '../auth.service';


@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return console.log('test');
  }

}

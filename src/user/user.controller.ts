import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
/* eslint-disable prettier/prettier */
import { UserService } from './user.service';
import { RolesGuard } from './roles.guard';
import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  Response,
  UseGuards,
  ValidationPipe,
  SetMetadata,
} from '@nestjs/common';
// import { Roles } from './roles.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(RolesGuard)
  // @Get('mod')
  // getMod(@Request() req) {
  //   return this.userService.isModerator();
  // }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('admin')
  // @Roles('admin')
  // async getAdmin(
  //   @Response() res: any,
  //   @Request() req
  //   ) {
  //   const isAdmin = await this.userService.isAdmin();
  //   return res.status(200).send(req.user);
  // }


}

/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Request,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';

import {MailService} from './mail.service';
import {Response} from 'express';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Get('activate')
  async activation(
    @Request() req : any,
    @Query() query,
    @Res() res: Response,
    ): Promise<any> {
      const activated = await this.mailService.confirmEmail(query);
    return res.status(HttpStatus.OK).send(activated);
  }

}

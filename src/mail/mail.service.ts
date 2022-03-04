/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { User } from '../user/user.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Fourmislabs! Confirm your Email',
      template: 'confirmation',
      attachments: [{
      filename: '90451519716512050.png',
        path: path.join(__dirname, '/images/90451519716512050.png'),
        cid: 'spiner',
      },
      {
        filename: '57401519716541732.png',
          path:  path.join(__dirname, '/images/57401519716541732.png'),
          cid: 'headerlogofourmislabs',
        }],
      context: {
        name: user.username,
        url,
      },
    });
  }
}

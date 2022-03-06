/* eslint-disable prettier/prettier */
import {MailerService} from '@nestjs-modules/mailer';
import {Injectable} from '@nestjs/common';
import * as path from 'path';
import {User} from '../user/user.interface';
import {JwtService} from '@nestjs/jwt';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';


@Injectable()
export class MailService {
    constructor(
      @InjectModel('User') private UserModel: Model<User>,
      private mailerService: MailerService,
      private jwtService: JwtService,
      ) {}


  async confirmEmail(query: any) {
    const decode = await this.jwtService.verify(query.token);
    const promise = await this.UserModel.findOneAndUpdate({email: decode.email}, {isVerified: true})

    return decode;
  }

  async sendUserConfirmation(user: User, token: string) {
    //TODO remplacer par variable environement
    const url = `http://localhost:4200/mail/activate?key=${token}`;

    await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Fourmislabs! Confirm your Email',
        template: 'confirmation',
        attachments: [
            {
                filename: ' banner.png',
                path: path.join(__dirname, '/images/banner.png'),
                cid: 'banner',
            },
            {
                filename: 'registered.png',
                path: path.join(__dirname, '/images/registered.png'),
                cid: 'registered',
            },
            {
                filename: 'facebook_1.png',
                path: path.join(__dirname, '/images/facebook_1.png'),
                cid: 'facebook_1',
            },
            {
                filename: 'discord_1.png',
                path: path.join(__dirname, '/images/discord_1.png'),
                cid: 'discord_1',
            },
            {
                filename: 'patreon_1.png',
                path: path.join(__dirname, '/images/patreon_1.png'),
                cid: 'patreon_1',
            },
            {
                filename: 'check_1.png',
                path: path.join(__dirname, '/images/check_1.png'),
                cid: 'check_1',
            },
        ],
        context: {
            name: user.username,
            url,
        },
    });
  }
}
/* eslint-disable prettier/prettier */
import {MailerService} from '@nestjs-modules/mailer';
import {Injectable} from '@nestjs/common';
import * as path from 'path';
import {User} from '../user/user.interface';

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
            attachments: [
                {
                    filename: 'brand.png',
                    path: path.join(__dirname, '/images/brand.png'),
                    cid: 'brand',
                },
                {
                    filename: 'bg.png',
                    path: path.join(__dirname, '/images/bg.png'),
                    cid: 'bg',
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

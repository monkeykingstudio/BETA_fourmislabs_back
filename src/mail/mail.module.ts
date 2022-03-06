/* eslint-disable prettier/prettier */
import {JwtModule} from '@nestjs/jwt';
import {MailerModule} from '@nestjs-modules/mailer';
import {MongooseModule} from '@nestjs/mongoose';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {Global, Module} from '@nestjs/common';
import {MailService} from './mail.service';
import {join} from 'path';
import {ConfigService} from '@nestjs/config';
import  { MailController } from './mail.controller';
import {UserSchema} from '../auth/schemas/user.schema'


@Global()
@Module({
    imports: [
      MongooseModule.forFeature([
        {name: 'User', schema: UserSchema},
      ]),
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get('MAIL_HOST'),
                    port: 587,
                    secure: false,
                    auth: {
                        user: config.get('MAIL_USER'),
                        pass: config.get('MAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: `"Fourmislabs | No Reply" <${config.get(
                        'MAIL_FROM',
                    )}>`,
                },
                // preview: true,
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {expiresIn: '48h'},
      }),
    ],
    providers: [MailService],
    controllers: [MailController],
    exports: [MailService],
})
export class MailModule {}

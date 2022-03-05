import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './strategies/jwt.strategy';
import {LocalStrategy} from './strategies/local.strategy';

import {AuthController} from './controllers/auth.controller';

import {AuthService} from './auth.service';
import {UserSchema} from './schemas/user.schema';
import {RoleSchema} from './schemas/role.schema';
import {MailModule} from '../mail/mail.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},
            {name: 'Role', schema: RoleSchema},
        ]),
        MailModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '60s'},
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}

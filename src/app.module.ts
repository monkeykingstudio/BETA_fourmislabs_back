/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import { GoogleAuthController } from './google-auth/google-auth.controller';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { GoogleAuthModule } from './google-auth/google-auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI, {}),
        AuthModule,
        UserModule,
        GoogleAuthModule,
    ],
    controllers: [AppController, GoogleAuthController],
    providers: [AppService, GoogleAuthService],
})
export class AppModule {}

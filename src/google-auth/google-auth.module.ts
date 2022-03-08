/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [AuthModule],
  controllers: [GoogleAuthController],
  providers: [GoogleStrategy],
})
export class GoogleAuthModule {}

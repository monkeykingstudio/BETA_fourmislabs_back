/* eslint-disable prettier/prettier */
import {
    IsString,
    MaxLength,
    MinLength,
    IsEmail,
    IsBoolean,
} from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(25)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, {message: 'Password is too short (8 characters min)'})
    @MaxLength(30, {message: 'Password is too long (30 characters max)'})
    password: string;

    @IsBoolean()
    newsletter: boolean;
}

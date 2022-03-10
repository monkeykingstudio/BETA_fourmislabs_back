/* eslint-disable prettier/prettier */
import {Document} from 'mongoose';

export interface User extends Document {
    readonly username: string;
    readonly email: string;
    roles: [];
    newsletter: boolean;
    readonly password?: string;
    providerId?: string;
    provider?: string;
}

export interface UserRequest {
    accessToken: string;
    userId: string;
    email: string;
    username: string;
    roles: string[];
    newsletter: boolean;
    isVerified: boolean;
}

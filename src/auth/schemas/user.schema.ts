/* eslint-disable prettier/prettier */
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true})
    username: string;

    @Prop({unique: true,required: true})
    email: string;

    @Prop({required: false})
    password: string;

    @Prop({default: true})
    newsletter: boolean;

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true}])
    roles: [];

    @Prop({default: false, required: false})
    isVerified: boolean;

    @Prop({required: false})
    providerId: string;

    @Prop({required: false})
    provider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

/* eslint-disable prettier/prettier */
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({unique: true, required: true})
    username: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({default: true})
    newsletter: boolean;

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}])
    roles: [];
}

export const UserSchema = SchemaFactory.createForClass(User);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Message } from '../../message/entities/message.entity';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[]

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
    messages: Message[]
}

export const RoomSchema = SchemaFactory.createForClass(Room);
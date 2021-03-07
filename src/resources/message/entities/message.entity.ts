
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Room } from 'src/resources/room/entities/room.entity';

export type MessageDocument = Message & Document;

@Schema({
    timestamps: true
})
export class Message {
    @Prop()
    message: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    from: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
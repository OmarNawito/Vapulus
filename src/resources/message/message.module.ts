import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }, { name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    UsersModule,
    RoomModule
  ],
  providers: [MessageGateway, MessageService],
})
export class MessageModule { }

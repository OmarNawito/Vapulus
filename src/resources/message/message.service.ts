import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { RoomService } from '../room/room.service';
import { Message, MessageDocument } from './entities/message.entity';

@Injectable()
export class MessageService {

  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private roomServices: RoomService
  ) { }

  async handleDisconnect(clientId: string): Promise<User> {
    const user = await this.userModel.findOne({ clientId: clientId });
    if (user) {
      user.clientId = null;
      await this.userModel.findByIdAndUpdate(user._id, user);
    }
    return user;
  }

  async enterChatRoom(userId, clientId: string, roomName): Promise<User> {
    let user = await this.userModel.findById(userId);
    if (user) {
      user.clientId = clientId;
      user = await this.userModel.findByIdAndUpdate(user._id, user, { new: true, useFindAndModify: false });
      const room = this.roomServices.findByName(roomName, user._id)
      return user;
    } else {
      return null
    }
  }

  async leaveChatRoom(firstName: string, lastName: string): Promise<User> {
    const user = await this.userModel.findOne({ firstName, lastName });
    return user;
  }

  async addMessage(msg: string, clientId: string, roomName: string): Promise<Message> {
    let user = await this.userModel.findOne({ clientId });
    let message = await this.messageModel.create({ message: msg, from: user._id });
    let room = await this.roomServices.findByName(roomName, null);
    room.messages.push(message);

    await this.roomServices.update(room.name, room);
    return message;
  }

  findAll() {
    return `This action returns all message`;
  }
}

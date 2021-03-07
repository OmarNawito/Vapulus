import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>) { }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const createRoom = new this.roomModel(createRoomDto);
    return await createRoom.save();
  }

  async findAll(q): Promise<Room[]> {
    return await this.roomModel.find({ name: { $regex: new RegExp(`.*${q}.*`) } }).populate("messages").populate("users").exec()
  }

  async findOne(id: string): Promise<Room> | null {
    return await this.roomModel.findById(id).populate("messages").populate("users").exec();
  }

  async findByName(name: string, userId): Promise<Room> | null {
    let room = await this.roomModel.findOne({ name: name }).exec();
    if (!room) {
      let newRoom = new this.roomModel({ name: name });
      if (userId) {
        newRoom.users.push(userId);
      }
      return await newRoom.save();
    }
    if (userId) {
      room.users.push(userId);
    }
    await room.save();
    return room;
  }

  async update(name: string, updateRoomDto: UpdateRoomDto) {
    return await this.roomModel.findOneAndUpdate({ name: name }, updateRoomDto).exec();
  }

  async remove(id: string) {
    return await this.roomModel.findByIdAndRemove(id).exec();
  }

  async findMessages(id: string, limit: number) {
    let room = await this.roomModel.findById(id).slice('messages', limit).exec()
    if (!room) {
      const userRoom = new this.roomModel({ _id: id, isUser: true })
      await userRoom.save();
    }
    return room.messages;
  }
}

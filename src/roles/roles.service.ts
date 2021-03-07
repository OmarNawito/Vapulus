import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) { }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const newRole = await new this.roleModel(createRoleDto);
      return newRole.save();
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    return await this.roleModel.find();
  }

  async findOne(id: string) {
    return await this.roleModel.findById(id);
  }

  async update(id: number, updateRoleDto: CreateRoleDto) {
    return await this.roleModel.findByIdAndUpdate(id, updateRoleDto);
  }

  async remove(id: string) {
    return await this.roleModel.findByIdAndRemove(id);
  }
}

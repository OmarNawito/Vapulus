import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MONGO_URL } from 'src/enviroments/index'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RoomModule } from './resources/room/room.module';
import { MessageModule } from './resources/message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_URL, { createIndexes: true }),
    UsersModule,
    AuthModule,
    RolesModule,
    RoomModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

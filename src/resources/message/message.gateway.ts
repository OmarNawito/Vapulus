import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
  MessageBody
} from '@nestjs/websockets';

import { MessageService } from './message.service';
import { Logger, UseGuards, Request } from '@nestjs/common';
import { WsGuard } from 'src/auth/guards/ws.guard';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' })
@UseGuards(WsGuard)
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly messageService: MessageService) { }

  private logger: Logger = new Logger('MessageGateway');

  afterInit(server: any) {
    this.logger.log('intalized');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  async handleDisconnect(client: any) {
    this.logger.log(`Client Disconnected: ${client.id}`);
    const data = await this.messageService.handleDisconnect(client.id)
    client.server.emit('users-changed', { user: data.firstName + data.lastName, event: 'left' });
  }

  @SubscribeMessage('enter-chat-room')
  async enterChatRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }, @Request() req) {
    await this.messageService.enterChatRoom(req.user._id, client.id, data.roomId)
    client.join(data.roomId).to(data.roomId).broadcast.emit('users-changed', { user: req.user.firstName + " " + req.user.lastName, event: 'joined' });
  }

  @SubscribeMessage('leave-chat-room')
  async leaveChatRoom(client: Socket, data: { firstName: string, lastName: string, roomId: string }) {
    const user = await this.messageService.leaveChatRoom(data.firstName, data.lastName)
    client.broadcast.to(data.roomId).emit('users-changed', { user: user.firstName + user.lastName, event: 'left' });
    client.leave(data.roomId);
  }

  @SubscribeMessage('add-message')
  async addMessage(@ConnectedSocket() client: Socket, @MessageBody() data) {
    this.messageService.addMessage(data.message, client.id, data.roomId);
    client.broadcast.to(data.roomId).emit('message', { data })
  }


  @SubscribeMessage('leaveRoom')
  handelLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}

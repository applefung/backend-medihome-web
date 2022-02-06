import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  async onEvent(@MessageBody() data: string) {
    return data;
  }

  @SubscribeMessage('chat')
  createRoom(
    @MessageBody() { roomId }: Record<'roomId', string>,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(roomId);
  }
}

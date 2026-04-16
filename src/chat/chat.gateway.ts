import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WsException,
} from '@nestjs/websockets';
import { UseFilters, UsePipes, ValidationPipe, UseGuards, UseInterceptors, Inject } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsExceptionFilter } from './filters/ws-exception.filter';
import { ChatDto } from './dto/chat.dto';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { WsLoggingInterceptor } from './interceptors/ws-logging.interceptor';

@UseFilters(new WsExceptionFilter())
@UseInterceptors(WsLoggingInterceptor)
@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
    @Inject('CHAT_CONFIG') private config: any,
  ) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @UseGuards(WsAuthGuard)
  @UsePipes(new ValidationPipe({
    whitelist: true,              
    forbidNonWhitelisted: true, 
    exceptionFactory: (errors) => new WsException(errors),
  }))
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: ChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Message received:', data);

     if (this.config.bannedRooms.includes(data.room)) {
      throw new WsException('You are not allowed in this room.');
    }

    client.emit('reply', {
      room: data.room,
      text: `Server Echo: ${data.text}`,
    });
  }
  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (!room || typeof room !== 'string') {
      // Manually throw WsException — filter will catch and format it
      throw new WsException('Room name must be a non-empty string.');
    }

    client.join(room);
    client.emit('joined', { room, message: `You joined room: ${room}` });
  }
}

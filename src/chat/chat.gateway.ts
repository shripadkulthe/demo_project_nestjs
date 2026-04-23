import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WsException,
} from '@nestjs/websockets';
import { UseFilters, UsePipes, ValidationPipe, UseGuards, UseInterceptors, Inject, forwardRef } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsExceptionFilter } from './filters/ws-exception.filter';
import { ChatDto } from './dto/chat.dto';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { WsLoggingInterceptor } from './interceptors/ws-logging.interceptor';
import { ChatContextService } from './chatContextService';

@UseFilters(new WsExceptionFilter())
@UseInterceptors(WsLoggingInterceptor)
@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
    @Inject('CHAT_CONFIG') private config: any,
    @Inject(forwardRef(() => ChatContextService))
    private readonly context: ChatContextService,
  ) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    console.log('Config:', this.config);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

   notifyUserChange(user: any) {
    console.log('[ChatGateway] notifyUserChange called for:', user?.name);
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
     this.context.setUser(client.data.user);
    console.log('Request ID:', this.context.requestId);
    console.log('User from context:', this.context.getUser());

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
  const user = client.data?.user;

  if (user) {
    this.context.setUser(user);
  }

  console.log('Request ID:', this.context.requestId);
  console.log('User from context:', this.context.getUser());
  console.log('Config in join:', this.config);

  if (!room || typeof room !== 'string') {
    throw new WsException('Room name must be a non-empty string.');
  }

  if (this.config.bannedRooms.includes(room)) {
    throw new WsException('You cannot join this room');
  }

  client.join(room);
  client.emit('joined', { room, message: `You joined room: ${room}` });
}
}

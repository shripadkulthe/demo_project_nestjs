import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, WsException, OnGatewayInit 
} from '@nestjs/websockets';
import { UseFilters, UsePipes, ValidationPipe, UseGuards, UseInterceptors, Inject,OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsExceptionFilter } from './filters/ws-exception.filter';
import { ChatDto } from './dto/chat.dto';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { WsLoggingInterceptor } from './interceptors/ws-logging.interceptor';
import type{ ChatConfig } from './chat.module';

@UseFilters(new WsExceptionFilter())
@UseInterceptors(WsLoggingInterceptor)
@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, OnModuleInit, OnModuleDestroy {

  constructor(
    @Inject('CHAT_CONFIG') private config: ChatConfig,
  ) {}

  afterInit(server: any) {
    console.log('[ChatGateway] WebSocket server initialized');
    console.log('[ChatGateway] Adapter:', server?.engine?.constructor?.name);
  }

  onModuleInit() {
    console.log('[ChatGateway] Module initialized');
    console.log('[ChatGateway] Loaded config:', this.config);
  }

  onModuleDestroy() {
    console.log('[ChatGateway] Module destroyed');

  }

  handleConnection(client: Socket) {
    console.log(`[ChatGateway] Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`[ChatGateway] Client disconnected: ${client.id}`);
  }

  notifyUserChange(user: any) {
    console.log('[ChatGateway] notifyUserChange:', user?.name);
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
    const requestId = client.data.requestId;
    const user = client.data.user;

    console.log('Request ID:', requestId);
    console.log('User:', user);

    if (this.config?.bannedRooms?.includes(data.room)) {
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
    const requestId = client.data.requestId;
    const user = client.data.user;

    console.log('Request ID:', requestId);
    console.log('User:', user);

    if (!room || typeof room !== 'string') {
      throw new WsException('Room name must be a non-empty string.');
    }

    if (this.config?.bannedRooms?.includes(room)) {
      throw new WsException('You cannot join this room');
    }

    client.join(room);
    client.emit('joined', {
      room,
      message: `You joined room: ${room}`,
    });
  }
}
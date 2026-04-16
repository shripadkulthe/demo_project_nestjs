import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { WsLoggingInterceptor } from './interceptors/ws-logging.interceptor';

@Module({

  providers: [ChatGateway, WsAuthGuard, WsLoggingInterceptor,
    {
      provide: 'CHAT_CONFIG',
      useValue: {
        bannedRooms: ['banned'],
      },
    },
  ],
})
export class ChatModule {}

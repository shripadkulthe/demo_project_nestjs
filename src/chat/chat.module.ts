import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { WsLoggingInterceptor } from './interceptors/ws-logging.interceptor';

@Module({

  providers: [ChatGateway, WsAuthGuard, WsLoggingInterceptor,
    {
      provide: 'CHAT_CONFIG',
      useFactory: async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));

        return {
          bannedRooms: ['banned', 'admin'],
        };
      },
    },
  ],
})
export class ChatModule {}

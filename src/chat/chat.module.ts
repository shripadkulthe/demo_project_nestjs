import { Module, DynamicModule } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { WsLoggingInterceptor } from './interceptors/ws-logging.interceptor';
import { ChatContextService } from './chatContextService';

export interface ChatConfig {
  bannedRooms: string[];
}

@Module({})
export class ChatModule {

  static forRoot(config: ChatConfig): DynamicModule {
    return {
      module: ChatModule,
      providers: [
        ChatGateway,
        WsAuthGuard,
        WsLoggingInterceptor,
        ChatContextService,
        {
          provide: 'CHAT_CONFIG',
          useValue: config,
        },
      ],
      exports: ['CHAT_CONFIG'],
    };
  }

  static forRootAsync(options: {
    useFactory: (...args: any[]) => Promise<ChatConfig> | ChatConfig;
    inject?: any[];
  }): DynamicModule {
    return {
      module: ChatModule,
      providers: [
        ChatGateway,
        WsAuthGuard,
        WsLoggingInterceptor,
        ChatContextService,
        {
          provide: 'CHAT_CONFIG',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: ['CHAT_CONFIG'],
    };
  }
}
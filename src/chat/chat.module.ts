import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { WsAuthGuard } from './guards/ws-auth.guard';

@Module({

  providers: [ChatGateway, WsAuthGuard],
})
export class ChatModule {}

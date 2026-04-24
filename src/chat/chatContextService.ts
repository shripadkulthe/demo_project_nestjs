import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatContextService implements OnModuleInit {
  user: any;
  requestId: string = Math.random().toString(36).substring(7);

  private gateway!: ChatGateway;

 constructor(private readonly moduleRef: ModuleRef) {}

 onModuleInit() {
    this.gateway = this.moduleRef.get(ChatGateway, { strict: false });
  }

  setUser(user: any) {
    this.user = user;
    console.log(`[ChatContextService] User set: ${user?.name}`);
    if (this.gateway) {
      this.gateway.notifyUserChange(user);
    }
  }

  getUser() {
    return this.user;
  }
}
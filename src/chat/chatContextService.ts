import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatContextService {
  user: any;
  requestId: string = Math.random().toString(36).substring(7);

  constructor(
    @Inject(forwardRef(() => ChatGateway))
    private readonly gateway: ChatGateway,
  ) {}

  setUser(user: any) {
    this.user = user;
    console.log(`[ChatContextService] User set: ${user?.name}`);
    this.gateway.notifyUserChange(user);
  }

  getUser() {
    return this.user;
  }
}
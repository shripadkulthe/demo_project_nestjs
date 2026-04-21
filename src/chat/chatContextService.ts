import { Injectable, Scope } from '@nestjs/common';

@Injectable()
export class ChatContextService {
  user: any;
  requestId: string = Math.random().toString(36).substring(7);

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}

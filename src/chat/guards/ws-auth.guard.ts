import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ChatContextService } from '../chatContextService';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly instanceId = Math.random().toString(36).slice(2);

  constructor(private readonly context: ChatContextService) {}
  
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();

    const token = client.handshake?.auth?.token;

     console.log(`[WsAuthGuard instanceId: ${this.instanceId}] Token:`, token);

    if (!token) {
      throw new WsException('No token provided');
    }

    if (token !== 'valid-token') {
      throw new WsException('Invalid token');
    }

      const user = { id: 1, name: 'Demo User' };

      client.data.user = user;

      this.context.setUser(user);

    return true;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();

    const token = client.handshake?.auth?.token;

    console.log('Token:', token);

    if (!token) {
      throw new WsException('No token provided');
    }

    if (token !== 'valid-token') {
      throw new WsException('Invalid token');
    }

    return true;
  }
}

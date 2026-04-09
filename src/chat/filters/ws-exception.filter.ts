import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException | unknown, host: ArgumentsHost) {

    if (exception instanceof WsException) {
      const error = exception.getError();
      const client = host.switchToWs().getClient();

      client.emit('exception', {
        status: 'error',
        message: typeof error === 'string' ? error : JSON.stringify(error),
      });
      return;
    }

    if (exception instanceof HttpException) {
      const client = host.switchToWs().getClient();
      client.emit('error', {
        status: 'error',
        message: exception.getResponse(),
      });
      return;
    }

    super.catch(exception, host);
  }
}
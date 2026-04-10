import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class WsLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const client = context.switchToWs().getClient();
    const data = context.switchToWs().getData();

    const now = Date.now();

    console.log(`Client ${client.id} sent:`, data);

    return next.handle().pipe(
      tap((response) => {
        console.log(`Client ${client.id} received:`, response);
        console.log(`Execution time: ${Date.now() - now}ms`);
      }),
    );
  }
}
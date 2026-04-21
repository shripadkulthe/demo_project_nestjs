import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope, Inject } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable({ scope: Scope.TRANSIENT }) 
export class WsLoggingInterceptor implements NestInterceptor {

  private readonly createdAt = Date.now();

  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const client = context.switchToWs().getClient();
    const data = context.switchToWs().getData();

    const now = Date.now();
    const callerName = 'ChatGateway';

    const requestId = Math.random().toString(36).substring(7);

    const user = client.data?.user;

    console.log(`\n[${callerName}] ---- NEW REQUEST ----`);
    console.log(`[${callerName}] RequestId: ${requestId}`);
    console.log(`[${callerName}] Interceptor Instance: ${this.createdAt}`);
    console.log(`[${callerName}] User:`, user);
    console.log(`[${callerName}] Client ${client.id} sent:`, data);

    return next.handle().pipe(
      tap((response) => {
        console.log(`[${callerName}] Client ${client.id} received:`, response);
        console.log(`[${callerName}] Execution time: ${Date.now() - now}ms`);
        console.log(`[${callerName}] ---- END REQUEST ----\n`);
      }),
    );
  }
}
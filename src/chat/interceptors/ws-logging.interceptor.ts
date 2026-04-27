import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Scope, Inject } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable({ scope: Scope.TRANSIENT }) 
export class WsLoggingInterceptor implements NestInterceptor {

  private readonly createdAt = Date.now();

  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    const contextType = context.getType();

    const wsContext = context.switchToWs();
    const client = wsContext.getClient();
    const data = wsContext.getData();

    const requestId = Math.random().toString(36).substring(7);

    const user = client.data?.user;

    console.log(`\n[${className}] ---- NEW REQUEST ----`);
    console.log(`[${className}] Handler: ${handlerName}`);
    console.log(`[${className}] Type: ${contextType}`);
    console.log(`[${className}] RequestId: ${requestId}`);
    console.log(`[${className}] Interceptor Instance: ${this.createdAt}`);
    console.log(`[${className}] User:`, user);
    console.log(`[${className}] Client ${client.id} sent:`, data);

  return next.handle().pipe(
    tap((response) => {
      console.log(`[${className}] Handler: ${handlerName}`);
      console.log(`[${className}] Client ${client.id} received:`, response);
      console.log(`[${className}] Execution time: ${Date.now() - now}ms`);
      console.log(`[${className}] ---- END REQUEST ----\n`);
    }),
    );
  }
}
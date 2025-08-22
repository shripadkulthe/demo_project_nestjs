import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();

    
    const { method, originalUrl, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';

    
    this.logger.log(`>>> ${method} ${originalUrl} - ${userAgent} [${ip}]`);

    
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      this.logger.debug(`Request Body: ${JSON.stringify(request.body)}`);
    }

    
    const now = Date.now();

    
    return next.handle().pipe(
      tap(() => {
        
        const responseTime = Date.now() - now;
        
        this.logger.log(`<<< ${method} ${originalUrl} - ${responseTime}ms`);
      })
    );
  }
}
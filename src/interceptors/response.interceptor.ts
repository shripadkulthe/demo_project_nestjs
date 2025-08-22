import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

export interface ResponseFormat<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode,
        message: this.getMessage(response.statusCode),
        data: data,
      })),
    );
  }

  private getMessage(statusCode: number): string {
    switch (statusCode) {
      case 201:
        return 'Created successfully';
      default:
        return 'Success';
    }
  }
}
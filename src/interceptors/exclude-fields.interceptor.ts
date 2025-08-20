import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeFieldsInterceptor implements NestInterceptor {
  
  private readonly sensitiveFields = ['password', 'token', 'refreshToken', 'pin', 'ssn', 'creditCard'];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.removeSensitiveFields(data))
    );
  }

  private removeSensitiveFields(data: any): any {
   
    if (Array.isArray(data)) {
      return data.map(item => this.removeSensitiveFields(item));
    }

   
    if (data && typeof data === 'object' && !(data instanceof Date)) {
      const result = { ...data };
      
      
      this.sensitiveFields.forEach(field => {
        if (result[field] !== undefined) {
          delete result[field];
        }
      });

      
      Object.keys(result).forEach(key => {
        if (result[key] && typeof result[key] === 'object') {
          result[key] = this.removeSensitiveFields(result[key]);
        }
      });

      return result;
    }

    
    return data;
  }
}
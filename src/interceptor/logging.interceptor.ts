import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();

    console.log('Endpoint', req.url);
    console.log('Method', req.method);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`Execution time: ${Date.now() - now}ms`);
      })
    );
  }
}

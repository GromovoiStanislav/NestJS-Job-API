import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JobData = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req?.body[data] : req.body;
  }
);

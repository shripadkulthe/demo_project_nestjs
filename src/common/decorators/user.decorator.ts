import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const role = request.headers['role'] || 'User';

    const user = {
      id: 1,
      name: 'Shripad',
      type: role, 
      email: 'shripad@gmail.com',
    };

    request.user = user;

    return data ? user[data as keyof typeof user] : user;
  },
);

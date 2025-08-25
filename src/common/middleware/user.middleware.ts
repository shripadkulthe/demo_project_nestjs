import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const role = req.headers['role'] || 'User';

    req.user = {
      id: 1,
      name: 'Shripad',
      type: role,
      email: 'shripad@gmail.com',
    };

    next();
  }
}

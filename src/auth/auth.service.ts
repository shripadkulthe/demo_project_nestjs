import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  hashPassword(password: string): string {
    return `hashed_${password}_${Date.now()}`;
  }

  async validateUser(id: number, password: string) {
    const user = await this.userService.getUser(id);
    return user.password === password;
  }
}

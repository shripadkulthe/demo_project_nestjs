import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('No user found on request');
    }

    const userRole = (user.type || '').toLowerCase();
    const allowed = requiredRoles.map(r => r.toLowerCase());

    if (!allowed.includes(userRole)) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}

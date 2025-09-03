import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { randomUUID } from 'crypto';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private readonly id = randomUUID();

  constructor(@Inject(REQUEST) private readonly request: Request) {
    console.log('RequestService created with id:', this.id);
  }

  getId() {
    return {
      scope: 'Request',
      id: this.id,
      url: (this.request as any).url, 
    };
  }
}

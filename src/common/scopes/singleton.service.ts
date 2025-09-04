import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class SingletonService {
  private readonly id = randomUUID();

  constructor() {
    console.log('SingletonService created with id:', this.id);
  }

  getId() {
    return { scope: 'Singleton', id: this.id };
  }
}

import { Injectable, Scope } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {
  private readonly id = randomUUID();

  constructor() {
    console.log('TransientService created with id:', this.id);
  }

  getId() {
    return { scope: 'Transient', id: this.id };
  }
}

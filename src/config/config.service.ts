import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(
    @Inject('CONFIG_OPTIONS') private options: { folder: string },
  ) {}

  getFolder(): string {
    return this.options.folder;
  }
}

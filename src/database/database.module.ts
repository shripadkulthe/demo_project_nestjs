import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseService, DatabaseOptions } from './database.service';

@Module({})
export class DatabaseModule {
  static register(options: DatabaseOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: DatabaseService,
          useValue: new DatabaseService(options),
        },
      ],
      exports: [DatabaseService],
    };
  }
}

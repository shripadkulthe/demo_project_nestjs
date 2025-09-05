import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {
  static forRoot() {
    return {
      module: AdminModule,
      providers: [AdminService],
      controllers: [AdminController],
      exports: [AdminService],
    };
  }
}

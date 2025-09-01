import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('db-info')
  getDbInfo(): any {
    return this.databaseService.getConnectionInfo();
  }

@Get('config-folder')
getConfigFolder() {
  return {
    folder: this.configService.getFolder(),
  };
}
}
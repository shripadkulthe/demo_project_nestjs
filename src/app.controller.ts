import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
import { SingletonService } from './common/scopes/singleton.service';
import { RequestService } from './common/scopes/request.service';
import { TransientService } from './common/scopes/transient.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
    private readonly singletonService: SingletonService,
    private readonly requestService: RequestService,
    private readonly transientService: TransientService,
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


  @Get('singleton')
  getSingleton() {
    return this.singletonService.getId();
  }

  @Get('request')
  getRequest() {
    return this.requestService.getId();
  }

  @Get('transient')
  getTransient() {
    return {
      first: this.transientService.getId(),
      second: new TransientService().getId(), 
    };
  }
}

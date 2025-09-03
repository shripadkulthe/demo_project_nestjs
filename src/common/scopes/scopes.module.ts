import { Module } from '@nestjs/common';
import { SingletonService } from 'src/common/scopes/singleton.service';
import { RequestService } from 'src/common/scopes/request.service';
import { TransientService } from 'src/common/scopes/transient.service';

@Module({
  providers: [SingletonService, RequestService, TransientService],
  exports: [SingletonService, RequestService, TransientService],
})
export class ScopesModule {}

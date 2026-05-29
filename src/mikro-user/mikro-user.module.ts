import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { MikroUser } from './entities/mikro-user.entity';
import { MikroUserService } from './mikro-user.service';
import { MikroUserController } from './mikro-user.controller';

@Module({
  imports: [MikroOrmModule.forFeature([MikroUser])],

  providers: [MikroUserService],

  controllers: [MikroUserController],
})
export class MikroUserModule {}
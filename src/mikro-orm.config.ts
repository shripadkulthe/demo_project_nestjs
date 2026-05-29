import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { MongoDriver } from '@mikro-orm/mongodb';

const config: MikroOrmModuleOptions = {
  driver: MongoDriver,

  clientUrl: 'mongodb://127.0.0.1:27017',

  dbName: 'nestjs_mikroorm',

  autoLoadEntities: true,

  debug: true,
};

export default config;
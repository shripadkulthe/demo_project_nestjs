import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity()
export class MikroUser {
  @PrimaryKey({ type: 'ObjectId' })
  _id!: ObjectId;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string' })
  email!: string;

  @Property({ type: 'string' })
  role!: string;
}
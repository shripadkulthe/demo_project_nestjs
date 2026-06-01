import { Injectable } from '@nestjs/common';
import { ObjectId, EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MikroUser } from './entities/mikro-user.entity';

@Injectable()
export class MikroUserService {
  constructor(
    @InjectRepository(MikroUser)
    private readonly userRepository: EntityRepository<MikroUser>,
  ) {}

  async createUser(body: any) {
    const user = this.userRepository.create({
      name: body.name,
      email: body.email,
      role: body.role,
    });

    const em = this.userRepository.getEntityManager();

    em.persist(user);

    await em.flush();

    return {
    message: 'User created successfully',
    data: user,
    };
  }

  async getUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: string) {
  return this.userRepository.findOne({
    _id: new ObjectId(id),
  });
  }

  async updateUser(id: string, body: any) {
  const user = await this.userRepository.findOne({
    _id: new ObjectId(id),
  });

  if (!user) {
    return { message: 'User not found' };
  }

  user.name = body.name ?? user.name;
  user.email = body.email ?? user.email;
  user.role = body.role ?? user.role;

  await this.userRepository.getEntityManager().flush();

  return {
    message: 'User updated successfully',
    data: user,
  };
  }

  async deleteUser(id: string) {
  const user = await this.userRepository.findOne({
    _id: new ObjectId(id),
  });

  if (!user) {
    return {
      message: 'User not found',
    };
  }

  const em = this.userRepository.getEntityManager();

  em.remove(user);

  await em.flush();

  return {
    message: 'User deleted successfully',
  };
  }
}
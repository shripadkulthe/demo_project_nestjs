import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/mongodb';
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
}
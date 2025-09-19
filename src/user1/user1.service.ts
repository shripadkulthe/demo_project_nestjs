import {Injectable,NotFoundException,BadRequestException,UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User1, User1Document } from './schemas/user1.schema';

@Injectable()
export class User1Service {
  constructor(
    @InjectModel(User1.name) private user1Model: Model<User1Document>,
  ) {}

  async getAllUsers1(): Promise<User1Document[]> {
    return this.user1Model.find().exec();
  }

  async getUser1(id: string): Promise<User1Document> {
    const user = await this.user1Model.findById(id).exec();
    if (!user) throw new NotFoundException('User1 not found');
    return user;
  }

  async findById(id: string): Promise<User1Document> {
    const user = await this.user1Model.findById(id).exec();
    if (!user) throw new NotFoundException('User1 not found');
    return user;
  }

  async findByEmail(email: string): Promise<User1Document | null> {
    if (!email.includes('@')) {
      throw new BadRequestException('Invalid email format');
    }
    return this.user1Model.findOne({ email }).exec();
  }

  async addUser1(user: Partial<User1>): Promise<User1Document> {
    if (!user.email || !user.email.includes('@')) {
      throw new BadRequestException('Invalid email format');
    }
    if (!user.password) {
      throw new BadRequestException('Password is required');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new this.user1Model({
      ...user,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async update(id: string, updateData: Partial<User1>): Promise<User1Document> {
    if (updateData.email && !updateData.email.includes('@')) {
      throw new BadRequestException('Invalid email format');
    }

    const updatedUser = await this.user1Model
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedUser) throw new NotFoundException('User1 not found');
    return updatedUser;
  }

  async updateUser1(id: string, user: Partial<User1>): Promise<User1Document> {
    return this.update(id, user);
  }

  async removeUser1(id: string): Promise<{ deleted: boolean }> {
    const result = await this.user1Model.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('User1 not found');
    return { deleted: true };
  }

  async validateUser(email: string, password: string): Promise<User1Document> {
    if (!email.includes('@')) {
      throw new BadRequestException('Invalid email format');
    }

    const user = await this.user1Model.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}

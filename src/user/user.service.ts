import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers() {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return this.userModel.find();
  }

  async getUser(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 150));

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new Error('User not found..!!');
    }

    return user;
  }

  async addUser(user: UserDto) {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const newUser = new this.userModel({
      ...user,
      password: this.hashPassword(user.password),
    });

    return newUser.save();
  }

  async updateUser(id: string, userData: UserDto) {
    return this.userModel.findByIdAndUpdate(
      id,
      userData,
      { new: true },
    );
  }

  async deleteUser(id: string) {
  return this.userModel.findByIdAndDelete(id);
  }

  private hashPassword(password: string): string {
    return `hashed_${password}_${Date.now()}`;
  }
}
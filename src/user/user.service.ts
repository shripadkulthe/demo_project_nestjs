import { Injectable,Inject, forwardRef } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
  ) {}
  private users = [
    { 
      id: 1,
      name: "Shripad", 
      type: "Admin",
      email: "shripad@gmail.com",
      password: "123456",
    },
    { 
      id: 2,
      name: "Rahul", 
      type: "User",
      email: "rahul@gmail.com",
      password: "123458",
    }
  ];

  async getAllUsers() {
    
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.users;
  }

  async getUser(id: number) {
    
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new Error("User not found..!!");
    }
    return user;
  }

  async addUser(user: UserDto) { 
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const id = Date.now();
    const newUser = { 
      id, 
      ...user,
      email: user.email || 'default@example.com', 
      password: this.hashPassword(user.password)
    };
    
    this.users.push(newUser);
    return this.getUser(id); 
  }

  private hashPassword(password: string): string {
    return `hashed_${password}_${Date.now()}`;
  }
}
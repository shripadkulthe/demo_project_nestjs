import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
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

  getAllUsers() {
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new Error("User not found..!!");
    }
    return user;
  }

  addUser(user: UserDto) { 
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
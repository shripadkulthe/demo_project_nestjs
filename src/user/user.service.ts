import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

    private users = [
        { id: 1,
            name: "Shripad", 
            type:  "Admin"
        },
        { id: 2,
            name: "Rahul", 
            type:  "User"
        }
    ];
    getAllUsers() {
        return this.users;
    }

    getUser(id: number) {
        const user= this.users.find(user => user.id === id);
        if (!user) {
            throw new Error("User not found..!!")
        }
        return user;
    }
    addUser(user: UserDto) { 
        const id = Date.now();
        this.users.push({ 
            id, 
            ...user
     })
     return this.getUser(id); 
}
}

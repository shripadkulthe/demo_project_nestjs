import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}
    @Get ()
    getAllUsers() {
        return this.userService.getAllUsers();
}
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.userService.getUser(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
        return 
    }
    @Post()
    addUser(@Body() user: UserDto) { 
        return this.userService.addUser(user);
}
}
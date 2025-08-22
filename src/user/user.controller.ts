import {Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, UseGuards, UseInterceptors, ValidationPipe 
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { FirewallGuard } from 'src/firewall/firewall.guard';
import { ExcludeFieldsInterceptor } from 'src/interceptors/exclude-fields.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor'; 

@Controller('user')
@UseInterceptors(ExcludeFieldsInterceptor, ResponseInterceptor) 
export class UserController {

    constructor(private readonly userService: UserService) {}
    
    @Get()
    @UseInterceptors(new TimeoutInterceptor(5000)) 
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    @UseInterceptors(new TimeoutInterceptor(5000)) 
    getUser(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.userService.getUser(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    @UseGuards(FirewallGuard)
    @UseInterceptors(new TimeoutInterceptor(10000)) 
    addUser(@Body(new ValidationPipe({ transform: true })) user: UserDto) { 
        return this.userService.addUser(user);
    }
}
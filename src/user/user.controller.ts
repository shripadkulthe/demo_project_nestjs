import { 
  Body, Controller, Get, Inject,NotFoundException, Param, ParseIntPipe, 
  Post, UseGuards, UseInterceptors, ValidationPipe 
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { FirewallGuard } from 'src/firewall/firewall.guard';
import { ExcludeFieldsInterceptor } from 'src/interceptors/exclude-fields.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { User } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('user')
@UseInterceptors(
  LoggingInterceptor,          
  ExcludeFieldsInterceptor,    
  ResponseInterceptor          
)
@UseGuards(RolesGuard) 
export class UserController {
  constructor(private readonly userService: UserService,
    @Inject('APP_CONFIG') private readonly config: any, 
  ) {}

  @Get('config')
  getConfig() {
    return this.config;
  }
  
  @Get()
  @Roles('Admin') 
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
  @Roles('Admin') 
  @UseGuards(FirewallGuard)
  @UseInterceptors(new TimeoutInterceptor(10000)) 
  addUser(@Body(new ValidationPipe({ transform: true })) user: UserDto) { 
    return this.userService.addUser(user);
  }

  @Get('profile/me')
  getProfile(@User() user: any) {
    return { message: 'Current logged in user', user };
  }

  @Get('profile/email')
  getUserEmail(@User('email') email: string) {
    return { email };
  }
}

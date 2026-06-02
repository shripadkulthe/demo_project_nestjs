import { Body, Controller, Get, Inject, NotFoundException, Param, ParseIntPipe, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './queries/get-all-users.query';
import { GetUserByIdQuery } from './queries/get-user-by-id.query';
import { CreateUserCommand } from './commands/create-user.command';

@Controller('user')
@UseInterceptors(
  LoggingInterceptor,
  ExcludeFieldsInterceptor,
  ResponseInterceptor,
)
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly userService: UserService,
    @Inject('APP_CONFIG') private readonly config: any,
  ) {}

  @Get('config')
  getConfig() {
    return this.config;
  }

  @Get()
  @UseInterceptors(new TimeoutInterceptor(5000))
  getAllUsers() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  @Get(':id/validate/:password')
  async validateUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('password') password: string,
  ) {
    return this.userService['authService'].validateUser(id, password);
  }

  @Get(':id')
  @UseInterceptors(new TimeoutInterceptor(5000))
  getUser(@Param('id') id: string) {
    try {
      return this.queryBus.execute(new GetUserByIdQuery(id),);
    } catch (error) {
      throw new NotFoundException('Something went wrong');
    }
  }

  @Post()
  @UseInterceptors(new TimeoutInterceptor(10000))
  addUser(@Body(new ValidationPipe({ transform: true })) user: UserDto) {
     return this.commandBus.execute(new CreateUserCommand(user));
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

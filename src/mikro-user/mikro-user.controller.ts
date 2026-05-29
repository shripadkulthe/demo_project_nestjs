import { Body, Controller, Get, Post } from '@nestjs/common';
import { MikroUserService } from './mikro-user.service';

@Controller('mikro-user')
export class MikroUserController {
  constructor(
    private readonly mikroUserService: MikroUserService,
  ) {}

  @Post()
  createUser(@Body() body: any) {
    return this.mikroUserService.createUser(body);
  }

  @Get()
  getUsers() {
    return this.mikroUserService.getUsers();
  }
}
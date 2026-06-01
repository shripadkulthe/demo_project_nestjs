import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.mikroUserService.getUserById(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.mikroUserService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.mikroUserService.deleteUser(id);
  }
}
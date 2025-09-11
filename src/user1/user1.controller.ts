import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { User1Service } from './user1.service';

@Controller('user1')
export class User1Controller {
  constructor(private readonly user1Service: User1Service) {}

  @Get()
  getAll() {
    return this.user1Service.getAllUsers1();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.user1Service.getUser1(id);
  }

  @Post()
  add(@Body() user: any) {
    return this.user1Service.addUser1(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: any) {
    return this.user1Service.updateUser1(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.user1Service.removeUser1(id);
  }
}

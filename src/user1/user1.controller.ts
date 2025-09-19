import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { User1Service } from './user1.service';
import { CreateUser1Dto } from './dto/create-user1.dto';
import { UpdateUser1Dto } from './dto/update-user1.dto';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id.pipe';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('user1')   
@Controller('user1')
export class User1Controller {
  constructor(private readonly user1Service: User1Service) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all users' })
  getAll() {
    return this.user1Service.getAllUsers1();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Single user by ID' })
  getOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.user1Service.getUser1(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  add(@Body() user: CreateUser1Dto) {
    return this.user1Service.addUser1(user);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() user: UpdateUser1Dto,
  ) {
    return this.user1Service.updateUser1(id, user);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.user1Service.removeUser1(id);
  }
}
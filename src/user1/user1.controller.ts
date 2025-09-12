import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { User1Service } from './user1.service';
import { CreateUser1Dto } from './dto/create-user1.dto';
import { UpdateUser1Dto } from './dto/update-user1.dto';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id.pipe';


@Controller('user1')
export class User1Controller {
constructor(private readonly user1Service: User1Service) {}


@Get()
getAll() {
return this.user1Service.getAllUsers1();
}


@Get(':id')
getOne(@Param('id', ParseMongoIdPipe) id: string) {
return this.user1Service.getUser1(id);
}


@Post()
add(@Body() user: CreateUser1Dto) {
return this.user1Service.addUser1(user);
}


@Patch(':id')
update(
@Param('id', ParseMongoIdPipe) id: string,
@Body() user: UpdateUser1Dto,
) {
return this.user1Service.updateUser1(id, user);
}


@Delete(':id')
remove(@Param('id', ParseMongoIdPipe) id: string) {
return this.user1Service.removeUser1(id);
}
}
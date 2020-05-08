import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @Post()
  create(@Body() payload: any): Promise<User> {
    const user = new User().deserialize(payload);
    return this.userService.create(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any): Promise<User> {
    const user = new User().deserialize(payload);
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.userService.delete(id);
  }
}

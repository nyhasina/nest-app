import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private userService: UserService,
  ) {
  }

  @Post()
  create(@Body() payload: Partial<User>): Promise<User> {
    return this.userService.create(payload);
  }

  @Get()
  findAll(@Query() options: Partial<User>): Promise<User[]> {
    return this.userService.find(options);
  }

  @Get(':id')
  findOneById(@Param('id') id: number): Promise<User> {
    return this.userService.findOne({ id });
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: Partial<User>): Promise<User> {
    const user = new User(payload);
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<number> {
    return this.userService.delete(id);
  }
}

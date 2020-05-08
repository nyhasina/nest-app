import { Body, Controller, Post } from '@nestjs/common';
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
}

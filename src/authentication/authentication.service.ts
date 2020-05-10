import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {
  }

  async validateUser(payload: Partial<User>): Promise<any> {
    const user = await this.userService.findOne({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isValid = await bcrypt.compare(payload.password, user.password);
    if (!isValid) {
      return null;
    }
    return user;
  }
}

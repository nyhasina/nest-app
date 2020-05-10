import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }
    return user;
  }
}

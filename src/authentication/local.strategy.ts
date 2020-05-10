import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { User } from 'src/user/user.model';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  validate(payload: Partial<User>): Promise<any> {
    return this.authenticationService.validateUser(payload);
  }
}

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from 'src/authentication/authentication.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  validate(email: string, password: string): Promise<any> {
    return this.authenticationService.validateUser(email, password);
  }
}

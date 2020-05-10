import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/authentication/local.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthenticationModule {
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/authentication/authentication.constants';
import { JwtStrategy } from 'src/authentication/strategies/jwt.strategy';
import { LocalStrategy } from 'src/authentication/strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secretKey,
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {
}

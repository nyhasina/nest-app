import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/authentication/guards/local-auth.guard';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req): Promise<object> {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() payload: Partial<User>): Promise<User> {
    return this.userService.create(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req): Promise<User> {
    return req.user;
  }
}

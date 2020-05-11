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
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

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

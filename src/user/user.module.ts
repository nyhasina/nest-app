import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports: [
    TypeOrmModule,
    UserService
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
}

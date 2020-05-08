import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { PrimaryGeneratedColumn, Repository } from 'typeorm';

@Injectable()
export class UserService {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  find(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async update(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return user;
  }

  async delete(id): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/shared/base.service';
import { User } from 'src/user/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
      userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super(userRepository);
  }

  async create(payload: Partial<User>): Promise<User> {
    const saltRound = +this.configService.get<number>('SALT_ROUND');
    const password = await bcrypt.hash(payload.password, saltRound);
    const user = new User({ ...payload, password });
    return this.repository.save(user);
  }
}

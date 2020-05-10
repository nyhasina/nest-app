import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export class BaseService<T> {
  constructor(protected repository: Repository<T>) {
  }

  create(payload: T): Promise<T> {
    return this.repository.save(payload);
  }

  find(options: Partial<T> = {}): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(options: Partial<T>): Promise<T> {
    const result = await this.repository.findOne(options);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async update(id: number, payload: T): Promise<any> {
    let result = await this.repository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    result = { ...result, ...payload };
    return this.repository.save(result);
  }

  async delete(id: number): Promise<number> {
    const result = await this.repository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    await this.repository.delete(id);
    return id;
  }
}

import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export class BaseService<T> {
  constructor(protected repository: Repository<T>) {
  }

  create(payload: T): Promise<T> {
    return this.repository.save(payload);
  }

  find(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T> {
    const result = await this.repository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async update(id: number, payload: T): Promise<any> {
    const result = await this.repository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    return this.repository.update(id, payload);
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

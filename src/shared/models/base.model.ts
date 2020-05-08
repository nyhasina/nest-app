import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

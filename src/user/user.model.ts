import { BaseModel } from 'src/shared/models/base.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseModel {
  @Column()
  email: string;

  @Column()
  password: string;
}

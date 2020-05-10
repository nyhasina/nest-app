import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column() @Exclude()
  password: string;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}

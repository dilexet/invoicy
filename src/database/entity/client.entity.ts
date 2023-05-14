import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'clients' })
export class ClientEntity extends BaseEntity {
  @Column({ nullable: false })
  @AutoMap()
  firstName: string;

  @Column({ nullable: false })
  @AutoMap()
  lastName: string;

  @Column({ nullable: false, unique: true })
  @AutoMap()
  email: string;
}

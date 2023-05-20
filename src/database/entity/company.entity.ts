import { Column, Entity, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { ClientEntity } from './client.entity';

@Entity({ name: 'companies' })
export class CompanyEntity extends BaseEntity {
  @Column({ nullable: false, unique: true })
  @AutoMap()
  name: string;

  @Column({ nullable: false })
  @AutoMap()
  address: string;

  @Column({ nullable: false })
  @AutoMap()
  phone: string;

  @OneToMany(() => ClientEntity, (entity) => entity.company, {
    onDelete: 'SET NULL',
  })
  employees: Promise<ClientEntity[]>;
}

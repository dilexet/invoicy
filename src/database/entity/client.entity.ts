import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { CompanyEntity } from './company.entity';
import { PaymentEntity } from './paymentEntity';

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

  @ManyToOne(() => CompanyEntity, (entity) => entity.employees, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  company: Promise<CompanyEntity>;

  @OneToMany(() => PaymentEntity, (entity) => entity.client, {
    onDelete: 'SET NULL',
  })
  payments: Promise<PaymentEntity[]>;
}

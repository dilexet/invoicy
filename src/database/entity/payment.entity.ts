import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CompletedWorkEntity } from './completed-work.entity';
import { ClientEntity } from './client.entity';
import { InvoiceEntity } from './invoice.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'payments' })
export class PaymentEntity extends BaseEntity {
  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  @AutoMap()
  requestDate: Date;

  @OneToMany(() => CompletedWorkEntity, (entity) => entity.payment, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  completedWorks: Promise<CompletedWorkEntity[]>;

  @ManyToOne(() => ClientEntity, (entity) => entity.payments, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  client: Promise<ClientEntity>;

  @OneToOne(() => InvoiceEntity, (entity) => entity.payment, {
    onDelete: 'SET NULL',
  })
  invoice: Promise<InvoiceEntity>;
}

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { CompletedWorkEntity } from './completed-work.entity';
import { ClientEntity } from './client.entity';

@Entity({ name: 'payments' })
export class PaymentEntity extends BaseEntity {
  @Column({ unique: true, generated: 'increment', nullable: false })
  @AutoMap()
  invoiceNumber: number;

  @OneToMany(() => CompletedWorkEntity, (entity) => entity.invoice, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  completedWorks: Promise<CompletedWorkEntity[]>;

  @ManyToOne(() => ClientEntity, (entity) => entity.payments, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  client: Promise<ClientEntity>;
}

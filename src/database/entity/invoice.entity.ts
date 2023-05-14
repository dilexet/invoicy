import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CompletedWorkEntity } from './completed-work.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'invoices' })
export class InvoiceEntity extends BaseEntity {
  @Column({ unique: true, generated: 'increment', nullable: false })
  @AutoMap()
  invoiceNumber: number;

  @Column({ nullable: false })
  @AutoMap()
  email: string;

  @OneToMany(() => CompletedWorkEntity, (entity) => entity.invoice, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  completedWorks: CompletedWorkEntity[];
}

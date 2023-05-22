import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { PaymentEntity } from './payment.entity';

@Entity({ name: 'invoices' })
export class InvoiceEntity extends BaseEntity {
  @Column({ unique: true, generated: 'increment', nullable: false })
  @AutoMap()
  invoiceNumber: number;

  // TODO: create separate table ?
  @Column({ nullable: false })
  @AutoMap()
  senderOrganizationName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @AutoMap()
  totalPrice: number;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  @AutoMap()
  invoiceDate: Date;

  @OneToOne(() => PaymentEntity, (entity) => entity.invoice, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  payment: Promise<PaymentEntity>;
}

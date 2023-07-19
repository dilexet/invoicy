import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { PaymentEntity } from './payment.entity';
import { SenderEntity } from './sender.entity';

@Entity({ name: 'invoices' })
export class InvoiceEntity extends BaseEntity {
  @Column({ unique: true, nullable: false })
  @Generated('increment')
  @AutoMap()
  invoiceNumber: number;

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

  @OneToOne(() => SenderEntity, (entity) => entity.invoice, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  sender: Promise<SenderEntity>;
}

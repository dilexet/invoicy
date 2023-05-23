import { Column, Entity, OneToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { InvoiceEntity } from './invoice.entity';

@Entity({ name: 'senders' })
export class SenderEntity extends BaseEntity {
  @Column({ nullable: false })
  @AutoMap()
  email: string;

  @Column({ nullable: false })
  @AutoMap()
  organization: string;

  @Column({ nullable: false })
  @AutoMap()
  address: string;

  @Column({ nullable: false })
  @AutoMap()
  phone: string;

  @OneToOne(() => InvoiceEntity, (entity) => entity.sender, {
    onDelete: 'SET NULL',
  })
  invoice: Promise<InvoiceEntity>;
}

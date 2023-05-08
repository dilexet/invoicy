import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class InvoiceEntity extends BaseEntity {
  @Column()
  email: string;
}

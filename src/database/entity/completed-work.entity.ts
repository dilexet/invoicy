import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { InvoiceEntity } from './invoice.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'completed_works' })
export class CompletedWorkEntity extends BaseEntity {
  @Column({ nullable: false })
  @AutoMap()
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @AutoMap()
  price: number;

  @ManyToOne(() => InvoiceEntity, (entity) => entity.completedWorks, {
    onDelete: 'CASCADE',
  })
  invoice: InvoiceEntity;
}

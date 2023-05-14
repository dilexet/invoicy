import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from '../../database/entity/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceViewModel } from './view-model/invoice.view-model';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @InjectRepository(InvoiceEntity)
    private invoiceEntityRepository: Repository<InvoiceEntity>,
  ) {}

  async createAsync(
    createInvoiceDto: CreateInvoiceDto,
  ): Promise<InvoiceViewModel> {
    const invoiceEntity = this.mapper.map(
      createInvoiceDto,
      CreateInvoiceDto,
      InvoiceEntity,
    );
    const invoiceEntityCreated = await this.invoiceEntityRepository.save(
      invoiceEntity,
    );

    return this.mapper.map(
      invoiceEntityCreated,
      InvoiceEntity,
      InvoiceViewModel,
    );
  }
}

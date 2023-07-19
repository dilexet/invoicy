import { Inject, Injectable } from '@nestjs/common';
import { GenerateInvoiceDto } from '../dto/generate-invoice.dto';
import { PaymentEntity } from '../../../database/entity/payment.entity';
import { InvoiceEntity } from '../../../database/entity/invoice.entity';
import { InvoiceFileViewModel } from '../view-model/invoice-file.view-model';
import { ClientEntity } from '../../../database/entity/client.entity';
import { ClientViewModel } from '../../client-management/view-model/client.view-model';
import { CompanyEntity } from '../../../database/entity/company.entity';
import { CompanyViewModel } from '../../company-management/view-model/company.view-model';
import { CompletedWorkEntity } from '../../../database/entity/completed-work.entity';
import { CompletedWorkViewModel } from '../../payment/view-model/completed-work.view-model';
import * as moment from 'moment/moment';
import { SenderViewModel } from '../view-model/sender.view-model';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InvoiceHelpers {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {}

  public async invoiceCreateAsync(
    generateInvoiceDto: GenerateInvoiceDto,
    payment: PaymentEntity,
    invoice: InvoiceEntity,
  ): Promise<InvoiceFileViewModel> {
    const client = await payment.client;
    const company = await client.company;
    const completedWorks = await payment.completedWorks;

    const invoiceData = new InvoiceFileViewModel();
    invoiceData.invoiceId = invoice.id;
    invoiceData.client = this.mapper.map(client, ClientEntity, ClientViewModel);

    invoiceData.company = this.mapper.map(
      company,
      CompanyEntity,
      CompanyViewModel,
    );

    invoiceData.completedWorks = this.mapper.mapArray(
      completedWorks,
      CompletedWorkEntity,
      CompletedWorkViewModel,
    );

    invoiceData.totalPrice = (+invoice.totalPrice).toFixed(2);

    invoiceData.invoiceNumber = invoice.invoiceNumber;

    const invoiceDateFormat = this.config.get<string>('INVOICE_DATE_FORMAT');
    invoiceData.invoiceDate = moment(invoice.invoiceDate).format(
      invoiceDateFormat,
    );
    invoiceData.requestDate = moment(payment.requestDate).format(
      invoiceDateFormat,
    );
    invoiceData.sender = this.mapper.map(
      generateInvoiceDto,
      GenerateInvoiceDto,
      SenderViewModel,
    );

    return invoiceData;
  }

  public calculateTotalPrice(completedWorks: CompletedWorkEntity[]): number {
    return completedWorks.reduce(
      (totalPrice, completedWork) => totalPrice + +completedWork.price,
      0,
    );
  }
}

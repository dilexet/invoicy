import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { INVOICE_GENERATE_QUEUE_NAME } from '../../constants/queue.constants';
import { InvoiceFileViewModel } from './view-model/invoice-file.view-model';
import { writeFile } from 'fs-extra';
import { FilePathHelper } from '../../utils/file-path-helper';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HtmlTemplatesReader } from '../../utils/html-templates-reader';
import { PdfGeneratorService } from '../../utils/pdf-generator.service';

@Processor(INVOICE_GENERATE_QUEUE_NAME)
export class InvoiceConsumer {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
    private readonly filePathHelper: FilePathHelper,
    private readonly htmlTemplatesReader: HtmlTemplatesReader,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Process()
  async process(job: Job<InvoiceFileViewModel>): Promise<void> {
    return await this.generateInvoice(job.data);
  }

  private async generateInvoice(
    invoiceData: InvoiceFileViewModel,
  ): Promise<void> {
    const fileInfoModel = this.filePathHelper.pdfFilePathGeneration(
      invoiceData.invoiceNumber,
    );

    const templatePath = this.config.get<string>('INVOICE_TEMPLATE_PATH');

    const htmlTemplate: string =
      await this.htmlTemplatesReader.compiledHtmlTemplateASync(
        templatePath,
        invoiceData,
      );

    await writeFile(
      fileInfoModel.filePath,
      await this.pdfGeneratorService.generatePdfFromTemplate(htmlTemplate),
    );
  }
}

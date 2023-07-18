import { InvoiceFileViewModel } from '../view-model/invoice-file.view-model';
import { writeFile } from 'fs-extra';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilePathHelper } from '../../../utils/file-path-helper';
import { HtmlTemplatesReader } from '../../../utils/html-templates-reader';
import { PdfGeneratorService } from '../../../utils/pdf-generator.service';

@Injectable()
export class InvoiceGenerator {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
    private readonly filePathHelper: FilePathHelper,
    private readonly htmlTemplatesReader: HtmlTemplatesReader,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  public async generateInvoice(
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

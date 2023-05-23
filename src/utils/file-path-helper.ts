import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilePathHelper {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {}

  pdfFilePathGeneration(invoiceNumber: number): string {
    const pdfFilesDirectory = this.config.get<string>('PDF_FILES_PATH');

    const pdfFileExtension = this.config.get<string>('PDF_FILE_EXTENSION');

    const pdfFileNameTemplate = this.config.get<string>(
      'PDF_FILE_NAME_TEMPLATE',
    );

    const pdfFileName = pdfFileNameTemplate + invoiceNumber;

    return `${pdfFilesDirectory}/${pdfFileName}.${pdfFileExtension}`;
  }
}

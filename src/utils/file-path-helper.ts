import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInfoModel } from '../model/file-info.model';

@Injectable()
export class FilePathHelper {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {}

  pdfFilePathGeneration(invoiceNumber: number): FileInfoModel {
    const pdfFilesDirectory = this.config.get<string>('PDF_FILES_PATH');

    const pdfFileExtension = this.config.get<string>('PDF_FILE_EXTENSION');

    const pdfFileNameTemplate = this.config.get<string>(
      'PDF_FILE_NAME_TEMPLATE',
    );

    const pdfFileName = `${pdfFileNameTemplate}${invoiceNumber}`;
    const filePath = `${pdfFilesDirectory}/${pdfFileName}.${pdfFileExtension}`;

    return {
      fileName: `${pdfFileName}.${pdfFileExtension}`,
      fileType: pdfFileExtension,
      filePath: filePath,
    };
  }
}

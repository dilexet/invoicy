import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { File, generatePdf, Options } from 'html-pdf-node';

@Injectable()
export class PdfGeneratorService {
  generatePdfFromTemplate(template: string): Promise<Buffer> {
    const file: File = { content: template };
    const options: Options = { format: 'A4' };

    return new Promise((resolve, reject) => {
      generatePdf(file, options, (err, buffer) => {
        if (err) {
          reject(
            new InternalServerErrorException('Error while generating pdf'),
          );
        } else {
          resolve(buffer);
        }
      });
    });
  }
}

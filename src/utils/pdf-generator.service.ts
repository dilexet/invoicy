import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { File, generatePdf, Options } from 'html-pdf-node';

@Injectable()
export class PdfGeneratorService {
  generatePdfFromTemplate(template:string): Observable<Buffer> {
    const file: File = { content: template };
    const options: Options = { format: 'A4' };

    return new Observable<Buffer>((observer) => {
      generatePdf(file, options, (err, buffer) => {
        if (err) {
          observer.error(
            new InternalServerErrorException('Error while generating pdf'),
          );
        } else {
          observer.next(buffer);
          observer.complete();
        }
      });
    }).pipe(
      catchError((err) => {
        throw new InternalServerErrorException(err);
      }),
    );
  }
}

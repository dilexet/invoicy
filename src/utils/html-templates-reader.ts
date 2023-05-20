import { Injectable } from '@nestjs/common';
import { readFile } from 'fs-extra';
import handlebars from 'handlebars';

@Injectable()
export class HtmlTemplatesReader {
  async compiledHtmlTemplateASync(
    templatePath: string,
    data: object,
  ): Promise<string> {
    const template: string = await readFile(templatePath, 'utf-8');

    const compiledTemplate = handlebars.compile(template);

    return compiledTemplate(data);
  }
}

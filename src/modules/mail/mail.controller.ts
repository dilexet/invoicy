import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SendMailDto } from './dto/send-mail.dto';

@ApiTags('Mail')
@Controller('api/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiBody({
    type: SendMailDto,
  })
  async send(@Body() sendMailDto: SendMailDto):Promise<SendMailDto> {
    return await this.mailService.sendMailAsync(sendMailDto)
  }
}

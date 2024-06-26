import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto, CreateRequestMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }

  @Post('send-invite-mail')
  sendInviteMail(@Body() createMailDto: CreateMailDto) {
    return this.mailService.sendInviteMail(createMailDto.email, createMailDto.cant, createMailDto.event);
  }

  @Post('send')
  sendEmail(@Body() createRequestMailDto: CreateRequestMailDto) {
    return this.mailService.sendEmail(createRequestMailDto.email, createRequestMailDto.subject, createRequestMailDto.description, 2);
  }

}

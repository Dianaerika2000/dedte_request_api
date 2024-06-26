import { Data } from './../../node_modules/@types/ejs/index.d';
import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { DataEvent } from './interface/dataEvent.interface';
import { Events } from 'src/event/entities/event.entity';
import { ConfigService } from '@nestjs/config';
import { url } from 'inspector';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendInvitation(email: string, cant: number, event: Events) {
    const frontendDomain = this.configService.get('FRONTEND_DOMAIN');
    const url = `${frontendDomain}/event/${event.id}/invited?email=${email}/cant=${cant}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Invitación a un evento',
      template: './invitation',
      context: {
        event: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        cant: cant,
        address: event.address,
        guess: email,
        organizer: event.organizer.name,
        url: url,
      },
    });
  }

  async sendInvitationPhotographer(email: string, cant: number, event: Events) {
    const frontendDomain = this.configService.get('FRONTEND_DOMAIN');
    const url = `${frontendDomain}/event/${event.id}/invited?email=${email}/cant=${cant}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Invitación para cubrir un evento',
      template: './invitation',
      context: {
        event: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        cant: cant,
        address: event.address,
        guess: email,
        organizer: event.organizer.name,
        url: url,
      },
    });
  }
  
  async sendInviteMail(email: string, cant: number, event: DataEvent) {
    const frontendDomain = this.configService.get('FRONTEND_DOMAIN');
    const url = `${frontendDomain}/event/${event.id}/invited?email=${email}/cant=${cant}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Invitación a un evento',
      template: './invitation',
      context: {
        event: event.name,
        description: event.description,
        date: event.date,
        time: event.time,
        cant: cant,
        address: event.address,
        guess: email,
        url: url,
      },
    });

    return 'Email sent';
  }

  create(createMailDto: CreateMailDto) {
    return 'This action adds a new mail';
  }

  async sendEmail(email: string, subject: string, description: string, idRequest:number) {
    const urlEndpoint = this.configService.get('ENDPOINT');

    await this.mailerService.sendMail({
      to: email,
      subject: subject,
      template: './solicitud',
      context: {
        description: description,
        email: email,
        idRequest: idRequest,
        url: urlEndpoint,
      },
    });
  }
}

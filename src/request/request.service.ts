import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
import { Teacher } from './interfaces/teacher.interface';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,

    private mailService: MailService,
  ){}
  
  async create(createRequestDto: CreateRequestDto) {
    const {description, subject, people } = createRequestDto;

    const request = this.requestRepository.create({
      subject,
      description,
    });

    await this.requestRepository.save(request);

    await this.sendInvitationToTeachers(people, subject, description);

    return {
      message: 'Solicitud enviada correctamente',
      ...request,
    };
  }

  findAll() {
    return `This action returns all request`;
  }

  async findOne(id: number) {
    const request = await this.requestRepository.findOneBy({id});

    if (!request) {
      throw new NotFoundException(`La solicitud con el ${id} no fue encontrado`);
    }

    return request;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }

  private async sendInvitationToTeachers(teachers: Teacher[], subject: string, description: string) {
    teachers.map((teacher) => {
      this.mailService.sendEmail(teacher.email, subject, description);
    });
  }
}

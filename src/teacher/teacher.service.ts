import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { RequestService } from '../request/request.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,

    private requestService: RequestService,
  ){}

  async create(createTeacherDto: CreateTeacherDto) {
    const {request_id, email, status} = createTeacherDto;

    const request = await this.requestService.findOne(request_id);

    const teacher = this.teacherRepository.create({
      email,
      status,
      request
    });

    await this.teacherRepository.save(teacher);

    return {
      message: 'Solicitud registrada correctamente',
      ...teacher,
    };
  }

  async findAllByStatusAndRequestId(status: boolean, requestId: number): Promise<Teacher[]> {
    return this.teacherRepository.find({ 
      where: { 
        status,
        request: { id: requestId }
      } 
    });
  }

  findAll() {
    return `This action returns all teacher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}

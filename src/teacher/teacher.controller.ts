import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: any) {
    // Convertir campos a los tipos correctos
    createTeacherDto.status = createTeacherDto.status === 'true';
    createTeacherDto.request_id = parseInt(createTeacherDto.request_id, 10);

    // Llamar al método create del servicio con los datos convertidos
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get('status/:status/request/:requestId')
  findAllByStatusAndRequestId(
    @Param('status') status: string,
    @Param('requestId') requestId: string
  ){
    const isStatusActive = status === 'true'; // Convertir el parámetro de string a booleano
    const requestIdNumber = parseInt(requestId, 10); // Convertir el ID de solicitud a número
    return this.teacherService.findAllByStatusAndRequestId(isStatusActive, requestIdNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}

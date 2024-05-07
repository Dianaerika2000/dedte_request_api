import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  subject: string;
  
  @Column()
  description: string;

  @OneToMany(() => Teacher,
  (teacher) => teacher.request)
  teachers: Teacher[];
}

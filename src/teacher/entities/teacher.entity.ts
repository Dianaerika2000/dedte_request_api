import { Request } from "src/request/entities/request.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  status: boolean;

  @ManyToOne(() => Request, (request) => request.teachers)
  @JoinColumn({ name: 'request_id'})
  request: Request;
}

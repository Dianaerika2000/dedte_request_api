import { IsBoolean, IsEmail, IsNumber } from "class-validator";

export class CreateTeacherDto {
  @IsEmail()
  email: string;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  request_id: number;
}

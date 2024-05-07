import { IsBoolean, IsEmail } from "class-validator";

export class CreateTeacherDto {
  @IsEmail()
  email: string;

  @IsBoolean()
  status: boolean;
}

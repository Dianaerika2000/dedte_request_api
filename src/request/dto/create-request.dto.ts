import { Type } from "class-transformer";
import { IsArray, IsEmail, ValidateNested, IsString } from 'class-validator';
class People {
  @IsEmail()
  email: string;
}
export class CreateRequestDto {
  @IsString()
  subject: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => People)
  people: People[];
}

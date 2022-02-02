import { IsEmail, IsString } from 'class-validator';
import { DoctorDto } from '@src/dtos/doctor.dto';

export class DoctorUserDto extends DoctorDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

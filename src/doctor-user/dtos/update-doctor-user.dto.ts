import { IsString } from 'class-validator';

export class UpdateDoctorUserDto {
  @IsString()
  password: string;
}

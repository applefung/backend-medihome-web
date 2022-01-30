import { IsInt, IsString, IsUUID } from 'class-validator';

export class DoctorCommentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  rating: number;

  @IsUUID()
  patientUserId: string;
}

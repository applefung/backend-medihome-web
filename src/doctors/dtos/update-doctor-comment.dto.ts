import { IsUUID } from 'class-validator';
import { DoctorCommentDto } from './doctor-comment.dto';

export class UpdateDoctorCommentDto extends DoctorCommentDto {
  @IsUUID()
  id: string;
}

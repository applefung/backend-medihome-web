import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DoctorCommentsService } from '../services/doctor-comments.service';
import { DoctorCommentDto } from '../dtos';

@Controller('doctor-users')
export class DoctorCommentsController {
  constructor(private readonly doctorCommentsService: DoctorCommentsService) {}

  @Get(':id/comments')
  getDoctorCommentsByDoctorId(@Param('id') id: string) {
    return this.doctorCommentsService.getDoctorCommentsByDoctorId(id);
  }

  @Get('comments/:commentId')
  getCommentById(@Param('commentId') id: string) {
    return this.doctorCommentsService.getDoctorComment({ id });
  }

  @Patch('comments/:commentId')
  async updateDoctorComment(
    @Param('commentId') id: string,
    @Body() data: DoctorCommentDto,
  ) {
    await this.doctorCommentsService.updateDoctorComment(id, data);
  }

  @Delete('comments/:commentId')
  async deleteDoctorComment(@Param('commentId') id: string) {
    await this.doctorCommentsService.deleteDoctorComment(id);
  }
}

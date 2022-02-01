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
import type { DoctorCommentParam } from '@src/types/doctor-comment';
import { UpdateDoctorCommentDto } from '../dtos/update-doctor-comment.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorCommentsService: DoctorCommentsService) {}

  @Get(':id/comments')
  getCommentsByDoctorId(@Param('id') id: string) {
    return this.doctorCommentsService.getCommentsByDoctorId(id);
  }

  @Get(':id/comments/:commentId')
  getCommentById(@Param() { id, commentId }: DoctorCommentParam) {
    return this.doctorCommentsService.getCommentByDoctorId({ id, commentId });
  }

  @Post(':id/comments')
  async createComment(@Param('id') id: string, @Body() data: DoctorCommentDto) {
    await this.doctorCommentsService.createComment(id, data);
  }

  @Patch(':id/comments/:commentId')
  async updateComment(
    @Param() { id, commentId }: DoctorCommentParam,
    @Body() data: UpdateDoctorCommentDto,
  ) {
    await this.doctorCommentsService.updateComment({ id, commentId }, data);
  }

  @Delete(':id')
  async deleteDoctor(@Param() { id, commentId }: DoctorCommentParam) {
    await this.doctorCommentsService.deleteDoctorComment({ id, commentId });
  }
}

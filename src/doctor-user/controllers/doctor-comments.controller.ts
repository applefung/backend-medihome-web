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
import { DoctorCommentDto } from '..//dtos';

@Controller('doctor-users')
export class DoctorsController {
  constructor(private readonly doctorCommentsService: DoctorCommentsService) {}

  @Get(':id/comments')
  getDoctorCommentsByDoctorId(@Param('id') id: string) {
    return this.doctorCommentsService.getDoctorCommentsByDoctorId(id);
  }

  @Get('comments/:commentId')
  getCommentById(@Param('id') id: string) {
    return this.doctorCommentsService.getDoctorComment({ id });
  }

  @Post('comments')
  async createDoctorComment(@Body() data: DoctorCommentDto) {
    await this.doctorCommentsService.createComment(data);
  }

  @Patch('comments/:commentId')
  async updateDoctorComment(
    @Param('id') id: string,
    @Body() data: DoctorCommentDto,
  ) {
    await this.doctorCommentsService.updateDoctorComment(id, data);
  }

  @Delete(':id')
  async deleteDoctorComment(@Param('id') id: string) {
    await this.doctorCommentsService.deleteDoctorComment(id);
  }
}

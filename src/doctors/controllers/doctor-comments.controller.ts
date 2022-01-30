import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DoctorCommentsService } from '../services/doctor-comments.service';
import { DoctorCommentDto, DoctorDto } from '../dtos';
import { GetDoctorsDto } from '../dtos/get-doctors-dto';
import { DoctorCommentParam } from '@src/types/doctor-comment';

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
    @Body() data: DoctorDto,
  ) {
    await this.doctorCommentsService.getCommentByDoctorIdOrFail({
      id,
      commentId,
    });
    return this.doctorCommentsService.updateComment(id, data);
  }

  @Delete(':id')
  async deleteDoctor(@Param('id') id: string) {
    // await this.doctorsService.getDoctorOrFail({ id });
    // return this.doctorsService.deleteDoctor(id);
  }
}

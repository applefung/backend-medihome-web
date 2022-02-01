import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from '@src/entities';
import type { CommentType } from '@src/types/doctor';
import type {
  DoctorComment,
  DoctorCommentParam,
} from '@src/types/doctor-comment';
import { getResponseByErrorCode } from '@src/utils/error';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { DoctorsService } from './doctors.service';
import { v4 } from 'uuid';

@Injectable()
export class DoctorCommentsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    private doctorsService: DoctorsService,
  ) {}
  async getCommentsByDoctorId(id: string) {
    return this.doctorsRepository
      .createQueryBuilder()
      .select(['comment'])
      .where({ id })
      .getOne();
  }

  async getCommentByDoctorId({ id, commentId }: DoctorCommentParam) {
    const result = await this.getCommentsByDoctorId(id);
    return result.comments.filter(({ id }) => id === commentId);
  }

  async getCommentByDoctorIdOrFail({ id, commentId }: DoctorCommentParam) {
    const result = await this.getCommentByDoctorId({ id, commentId });
    if (!result.length) {
      throw new NotFoundException(
        getResponseByErrorCode('DOCTOR_COMMENT_NOT_FOUND'),
      );
    }
    return result;
  }

  async createComment(
    doctorId: string,
    data: Pick<CommentType, 'title' | 'content' | 'rating' | 'patientUserId'>,
  ) {
    await this.doctorsService.getDoctorOrFail({
      id: doctorId,
    });
    const result = await this.getCommentsByDoctorId(doctorId);
    await this.doctorsRepository.update(doctorId, {
      comments: [
        ...result.comments,
        {
          id: v4(),
          time: dayjs(),
          ...data,
        },
      ],
    });
  }

  async updateComment(
    { id, commentId }: DoctorCommentParam,
    data: DoctorComment,
  ) {
    const currrentDoctorComments = await this.getCommentByDoctorIdOrFail({
      id,
      commentId,
    });

    await this.doctorsRepository.update(id, {
      comments: [...currrentDoctorComments, { ...data }],
    });
  }

  async deleteDoctorComment({ id, commentId }: DoctorCommentParam) {
    const currrentDoctorComments = await this.getCommentByDoctorIdOrFail({
      id,
      commentId,
    });

    await this.doctorsRepository.update(id, {
      comments: currrentDoctorComments.filter(({ id }) => id !== commentId),
    });
  }
}

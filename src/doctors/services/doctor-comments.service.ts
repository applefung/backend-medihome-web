import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from '@src/entities';
import { OrderType } from '@src/types/common';
import { CommentType } from '@src/types/doctor';
import { DoctorCommentParam } from '@src/types/doctor-comment';
import { Order } from '@src/utils/common';
import { DoctorField } from '@src/utils/doctor';
import { getResponseByErrorCode } from '@src/utils/error';
import dayjs from 'dayjs';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { DoctorsService } from './doctors.service';
import { v4 } from 'uuid';

interface GetDoctorsParams {
  specialty: string;
  district: string;
  search: string;
  page: string;
  limit: string;
  order: Order;
  orderBy: DoctorField;
}

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
      throw new NotFoundException(getResponseByErrorCode('CAROUSEL_NOT_FOUND'));
    }
    return result;
  }

  async createComment(
    doctorId: string,
    data: Pick<CommentType, 'title' | 'content' | 'rating' | 'patientUserId'>,
  ) {
    const currentDoctor = await this.doctorsService.getDoctorOrFail({
      id: doctorId,
    });
    if (!currentDoctor) {
      throw new NotFoundException(getResponseByErrorCode('CAROUSEL_NOT_FOUND'));
    }
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

  async updateComment(id: string, data: Partial<Doctor>) {
    await this.doctorsRepository.update(id, data);
  }

  async deleteDoctor(id: string) {
    await this.doctorsRepository.softDelete(id);
  }
}

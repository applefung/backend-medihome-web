import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorComment } from '@src/entities';
import { DoctorCommentType } from '@src/types/doctor-comment';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { DoctorUsersService } from './doctor-users.service';

@Injectable()
export class DoctorCommentsService {
  constructor(
    @InjectRepository(DoctorComment)
    private doctorCommentsRepository: Repository<DoctorComment>,
    private doctorUsersService: DoctorUsersService,
  ) {}
  async getDoctorCommentsByDoctorId(id: string) {
    const doctorUser = await this.doctorUsersService.getDoctorUserOrFail({
      id,
    });
    return this.doctorCommentsRepository.find({ doctorUser });
  }

  getDoctorComment(
    conditions: FindConditions<DoctorComment>,
    options?: FindOneOptions<DoctorComment>,
  ) {
    return this.doctorCommentsRepository.findOne(conditions, options);
  }

  async getDoctorCommentOrFail(
    conditions: FindConditions<DoctorComment>,
    options?: FindOneOptions<DoctorComment>,
  ) {
    const result = await this.doctorCommentsRepository.findOne(
      conditions,
      options,
    );
    if (!result) {
      throw new NotFoundException(
        getResponseByErrorCode('DOCTOR_COMMENT_NOT_FOUND'),
      );
    }
    return result;
  }

  async updateDoctorComment(id: string, data: DoctorCommentType) {
    await this.doctorCommentsRepository.update(id, { ...data });
  }

  async deleteDoctorComment(id: string) {
    await this.doctorCommentsRepository.softDelete(id);
  }
}

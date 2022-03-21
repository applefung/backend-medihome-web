import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorComment } from '@src/entities';
import { PatientUsersService } from '@src/patient-users/patient-users.service';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { DoctorUsersService } from './doctor-users.service';

type DoctorCommentType = Record<'doctorUserId' | 'patientUserId', string> &
  Pick<DoctorComment, 'title' | 'content' | 'rating'>;

@Injectable()
export class DoctorCommentsService {
  constructor(
    @InjectRepository(DoctorComment)
    private doctorCommentsRepository: Repository<DoctorComment>,
    private doctorUsersService: DoctorUsersService,
    private patientUsersService: PatientUsersService,
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

  async createComment({
    doctorUserId,
    patientUserId,
    ...data
  }: DoctorCommentType) {
    const doctorUser = await this.doctorUsersService.getDoctorUserOrFail({
      id: doctorUserId,
    });
    const patientUser = await this.patientUsersService.getPatientUserOrFail({
      id: patientUserId,
    });
    await this.doctorCommentsRepository.save({
      ...data,
      doctorUser,
      patientUser,
    });
  }

  async updateDoctorComment(id: string, data: DoctorCommentType) {
    await this.doctorCommentsRepository.update(id, { ...data });
  }

  async deleteDoctorComment(id: string) {
    await this.doctorCommentsRepository.softDelete(id);
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicsService } from '@src/clinic/clinic.service';
import { DoctorClinicReservationTimeslot } from '@src/entities';
import { Timeslot } from '@src/types/common';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { DoctorUsersService } from './doctor-users.service';

@Injectable()
export class DoctorClinicReservationTimeslotService {
  constructor(
    @InjectRepository(DoctorClinicReservationTimeslot)
    private doctorClinicReservationTimeslotRepository: Repository<DoctorClinicReservationTimeslot>,
    private doctorUsersService: DoctorUsersService,
    private clinicsService: ClinicsService,
  ) {}
  async getDoctorClinicReservationTimeslotDoctorId(id: string) {
    const doctorUser = await this.doctorUsersService.getDoctorUserOrFail({
      id,
    });
    return this.doctorClinicReservationTimeslotRepository.find({ doctorUser });
  }

  getDoctorClinicReservationTimeslot(
    conditions: FindConditions<DoctorClinicReservationTimeslot>,
    options?: FindOneOptions<DoctorClinicReservationTimeslot>,
  ) {
    return this.doctorClinicReservationTimeslotRepository.findOne(
      conditions,
      options,
    );
  }

  async getDoctorClinicReservationTimeslotOrFail(
    conditions: FindConditions<DoctorClinicReservationTimeslot>,
    options?: FindOneOptions<DoctorClinicReservationTimeslot>,
  ) {
    const result = await this.doctorClinicReservationTimeslotRepository.findOne(
      conditions,
      options,
    );
    if (!result) {
      throw new NotFoundException(
        getResponseByErrorCode('DOCTOR_CLINIC_RESERVATION_TIMESLOT_NOT_FOUND'),
      );
    }
    return result;
  }

  async createDoctorClinicReservationTimeslot({
    doctorUserId,
    clinicId,
    date,
    timeslot,
  }: Record<'doctorUserId' | 'clinicId' | 'date', string> &
    Record<'timeslot', Timeslot>) {
    const doctorUser = await this.doctorUsersService.getDoctorUserOrFail({
      id: doctorUserId,
    });
    const clinic = await this.clinicsService.getClinicOrFail({
      id: clinicId,
    });

    const { startTime, endTime } = timeslot;

    const result = await this.doctorClinicReservationTimeslotRepository
      .createQueryBuilder('doctorClinicReservationTimeslot')
      .where(
        `"doctorClinicReservationTimeslot".timeslot->>'startTime' = '${startTime}' AND "doctorClinicReservationTimeslot".timeslot->>'endTime' = '${endTime}' AND "doctorClinicReservationTimeslot"."doctorUserId" = '${doctorUser.id}' AND "doctorClinicReservationTimeslot"."clinicId" = '${clinic.id}'`,
      )
      .getMany();

    if (result.length) {
      throw new ConflictException(
        getResponseByErrorCode('RESERVATION_RECORD_ALREADY_EXIST'),
      );
    }

    await this.doctorClinicReservationTimeslotRepository.save({
      doctorUser,
      clinic,
      date,
      timeslot,
    });
  }

  async deleteDoctorComment(id: string) {
    await this.doctorClinicReservationTimeslotRepository.softDelete(id);
  }
}

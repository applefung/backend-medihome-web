import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorClinicReservationTimeslotService } from '@src/doctor-users/services/doctor-clinic-reservation-timeslot..service';
import { ReservationRecord } from '@src/entities';
import { getResponseByErrorCode } from '@src/utils/error';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { PatientUsersService } from './patient-users.service';

@Injectable()
export class ReservationRecordService {
  constructor(
    @InjectRepository(ReservationRecord)
    private reservationRecordRepository: Repository<ReservationRecord>,
    private doctorClinicReservationTimeslotService: DoctorClinicReservationTimeslotService,
    private patientUsersService: PatientUsersService,
  ) {}
  // ! May need pagination
  getReservationRecords(options?: FindManyOptions<ReservationRecord>) {
    return this.reservationRecordRepository.find(options);
  }

  getReservationRecord(
    conditions: FindConditions<ReservationRecord>,
    options?: FindOneOptions<ReservationRecord>,
  ) {
    return this.reservationRecordRepository.findOne(conditions, options);
  }

  async getReservationRecordOrFail(
    conditions: FindConditions<ReservationRecord>,
    options?: FindOneOptions<ReservationRecord>,
  ) {
    const result = await this.reservationRecordRepository.findOne(
      conditions,
      options,
    );
    if (!result) {
      throw new NotFoundException(
        getResponseByErrorCode('RESERVATION_RECORD_NOT_FOUND'),
      );
    }
    return result;
  }

  async createReservationRecord({
    doctorClinicReservationTimeslotId,
    patientUserId,
  }: Record<'doctorClinicReservationTimeslotId' | 'patientUserId', string>) {
    const doctorClinicReservationTimeslot =
      await this.doctorClinicReservationTimeslotService.getDoctorClinicReservationTimeslotOrFail(
        { id: doctorClinicReservationTimeslotId },
      );

    const patientUser = await this.patientUsersService.getPatientUserOrFail({
      id: patientUserId,
    });

    return this.reservationRecordRepository.save({
      doctorClinicReservationTimeslot,
      patientUser,
    });
  }

  async deleteReservationRecord(id: string) {
    await this.reservationRecordRepository.softDelete(id);
  }
}

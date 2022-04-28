import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorClinicReservationTimeslotService } from '@src/doctor-users/services/doctor-clinic-reservation-timeslot..service';
import { ReservationRecord } from '@src/entities';
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

  async deleterReservationRecord(id: string) {
    await this.reservationRecordRepository.softDelete(id);
  }
}

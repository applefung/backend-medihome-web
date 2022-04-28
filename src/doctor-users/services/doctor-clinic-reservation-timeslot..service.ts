import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicsService } from '@src/clinic/clinic.service';
import { DoctorClinicReservationTimeslot, DoctorComment } from '@src/entities';
import { Timeslot } from '@src/types/common';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { DoctorUsersService } from './doctor-users.service';

@Injectable()
export class DoctorClinicReservationTimeslotService {
  constructor(
    @InjectRepository(DoctorComment)
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
    ...data
  }: Record<'doctorUserId' | 'clinicId' | 'date', string> &
    Record<'timeslot', Timeslot>) {
    const doctorUser = await this.doctorUsersService.getDoctorUserOrFail({
      id: doctorUserId,
    });
    const clinic = await this.clinicsService.getClinicOrFail({
      id: clinicId,
    });
    await this.doctorClinicReservationTimeslotRepository.save({
      ...data,
      doctorUser,
      clinic,
    });
  }

  async deleteDoctorComment(id: string) {
    await this.doctorClinicReservationTimeslotRepository.softDelete(id);
  }
}

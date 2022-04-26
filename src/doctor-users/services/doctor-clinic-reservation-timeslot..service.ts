import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicsService } from '@src/clinic/clinic.service';
import { DoctorClinicReservationTimeslot, DoctorComment } from '@src/entities';
import { Timeslot } from '@src/types/common';
import { Repository } from 'typeorm';
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

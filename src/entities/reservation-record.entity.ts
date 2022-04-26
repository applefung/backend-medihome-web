import type { BilingualFormat } from '@src/types/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorClinicReservationTimeslot } from './doctor-clinic-reservation-timeslot.entity';
import { PatientUser } from './patient-user.entity';

@Entity()
export class ReservationRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => DoctorClinicReservationTimeslot)
  doctorClinicReservationTimeslot: DoctorClinicReservationTimeslot;

  @ManyToOne(() => PatientUser)
  patientUser: PatientUser;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

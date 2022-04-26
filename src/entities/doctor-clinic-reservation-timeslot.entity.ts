import type { BilingualFormat } from '@src/types/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Clinic } from './clinic.entity';
import { DoctorUser } from './doctor-user.entity';
import type { Timeslot } from '@src/types/common';

@Entity()
export class DoctorClinicReservationTimeslot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DoctorUser)
  doctorUser: DoctorUser;

  @ManyToOne(() => Clinic)
  clinic: Clinic;

  @Column()
  date: string;

  @Column('json')
  timeslot: Timeslot;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

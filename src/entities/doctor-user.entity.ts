import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorClinicReservationTimeslot } from './doctor-clinic-reservation-timeslot.entity';
import { Doctor } from './doctor.entity';

@Entity()
export class DoctorUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 254, unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Doctor, { cascade: ['insert', 'update'] })
  @JoinColumn()
  doctor: Doctor;

  @OneToMany(
    () => DoctorClinicReservationTimeslot,
    (doctorClinicReservationTimeslot) =>
      doctorClinicReservationTimeslot.doctorUser,
  )
  doctorClinicReservationTimeslot: DoctorClinicReservationTimeslot[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

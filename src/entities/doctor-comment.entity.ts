import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorUser } from './doctor-user.entity';
import { PatientUser } from './patient-user.entity';

@Entity()
export class DoctorComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 254, unique: true })
  title: string;

  @Column()
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => DoctorUser)
  @JoinColumn()
  doctorUser: DoctorUser;

  @ManyToOne(() => PatientUser)
  @JoinColumn()
  patientUser: PatientUser;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

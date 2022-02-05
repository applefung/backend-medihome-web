import { TokenType, tokenTypes } from '@src/utils/auth';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { DoctorUser, PatientUser } from '.';

@Entity()
export class ChatRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DoctorUser)
  doctorUser: DoctorUser;

  @ManyToOne(() => PatientUser)
  patientUser: PatientUser;

  @Column()
  expireAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

import { BilingualFormat } from '@src/types/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Clinic, Doctor } from '.';

@Entity()
export class DoctorClinicMap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Doctor)
  doctor: Doctor;

  @ManyToMany(() => Clinic)
  clinic: Clinic;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

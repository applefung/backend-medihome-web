import { ReservationTime } from '@src/types/clinic';
import type {
  AddressFormat,
  BilingualFormat,
  BusinessHours,
  MtrType,
} from '@src/types/common';
import type { ContactsFormat } from '@src/types/doctor';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  name: BilingualFormat;

  @Column('json')
  address: AddressFormat;

  @Column({ type: 'json', nullable: true })
  mtr: MtrType;

  @Column({ nullable: true })
  fee: string;

  @Column({ type: 'json', nullable: true })
  contacts: ContactsFormat;

  @Column({ type: 'json', nullable: true })
  businessHours: BusinessHours;

  @Column({ type: 'json', nullable: true })
  reservationTime: ReservationTime[];

  @ManyToMany(() => Doctor, (doctor) => doctor.clinics)
  doctors: Doctor[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

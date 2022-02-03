import { ReservationTime } from '@src/types/clinic';
import type {
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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  name: BilingualFormat;

  @Column('json')
  address: MtrType;

  @Column({ type: 'json', nullable: true })
  mtr: BilingualFormat;

  @Column({ nullable: true })
  fee: string;

  @Column({ type: 'json', nullable: true })
  contacts: ContactsFormat;

  @Column({ type: 'json', nullable: true })
  businessHours: BusinessHours;

  @Column({ type: 'json', nullable: true })
  reservationTime: ReservationTime[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

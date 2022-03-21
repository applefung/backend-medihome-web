import { Gender, genders } from '@src/utils/common';
import { Height, Weight } from '@src/types/patient-profile';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PatientProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bytea', nullable: true })
  avatar: Buffer;

  @Column({ type: 'enum', enum: genders, nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'json', nullable: true })
  height: Height;

  @Column({ type: 'json', nullable: true })
  weight: Weight;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

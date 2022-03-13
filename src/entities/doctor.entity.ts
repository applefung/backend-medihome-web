import type { BilingualArrayFormat, BilingualFormat } from '@src/types/common';
import type { CommentType, ContactsFormat } from '@src/types/doctor';
import { Gender, genders } from '@src/utils/common';
import { languages } from '@src/utils/doctor';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Clinic, District } from '.';
import { Specialty } from './specialty.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  name: BilingualFormat;

  @Column({ type: 'enum', enum: genders, nullable: true })
  gender: Gender;

  @Column({ type: 'enum', enum: languages, nullable: true, array: true })
  languages: string[];

  @Column({ type: 'json', nullable: true })
  contacts: ContactsFormat;

  @Column({ type: 'json', nullable: true })
  qualifications: BilingualArrayFormat;

  @Column({ type: 'json', nullable: true })
  services: BilingualArrayFormat;

  @Column({ type: 'json', nullable: true })
  hospitalAffiliations: BilingualArrayFormat;

  @Column({ type: 'json', nullable: true })
  comments: CommentType[];

  @ManyToOne(() => Specialty, (specialty) => specialty.doctors)
  specialty: Specialty;

  @ManyToMany(() => Clinic, (clinic) => clinic.doctors)
  @JoinTable()
  clinics: Clinic[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

import type { BilingualFormat, Name } from '@src/types/common';
import type { CommentType, ContactsFormat } from '@src/types/doctor';
import { Gender, genders, languages } from '@src/utils/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Clinic } from './clinic.entity';
import { Specialty } from './specialty.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  name: Name;

  @Column({ type: 'enum', enum: genders, nullable: true })
  gender: Gender;

  @Column({ type: 'enum', enum: languages, nullable: true, array: true })
  languages: string[];

  @Column({ type: 'json', nullable: true })
  contacts: ContactsFormat;

  @Column({ type: 'json', nullable: true })
  qualifications: BilingualFormat[];

  @Column({ type: 'json', nullable: true })
  services: BilingualFormat[];

  @Column({ type: 'json', nullable: true })
  hospitalAffiliations: BilingualFormat[];

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

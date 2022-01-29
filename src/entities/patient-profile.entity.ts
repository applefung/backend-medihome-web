import { Gender, genders } from 'src/utils/common';
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

  @Column({ type: 'enum', enum: genders, nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  weight: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

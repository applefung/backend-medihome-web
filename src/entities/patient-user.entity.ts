import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PatientProfile } from './patient-profile.entity';

@Entity()
export class PatientUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 254, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @OneToOne(() => PatientProfile, { cascade: ['insert', 'update'] })
  @JoinColumn()
  patientProfile: PatientProfile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

import { BilingualFormat, ContactsFormat } from 'src/types/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  name: BilingualFormat;

  @Column('json')
  languages: BilingualFormat;

  @Column('json')
  contacts: ContactsFormat;

  @Column('json')
  qualifications: BilingualFormat;

  @Column('json')
  services: BilingualFormat;

  @Column('json')
  hospitalAffiliations: BilingualFormat;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

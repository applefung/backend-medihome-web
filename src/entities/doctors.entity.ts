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

  @Column({ type: 'json', nullable: true })
  languages: BilingualFormat;

  @Column({ type: 'json', nullable: true })
  contacts: ContactsFormat;

  @Column({ type: 'json', nullable: true })
  qualifications: BilingualFormat;

  @Column({ type: 'json', nullable: true })
  services: BilingualFormat;

  @Column({ type: 'json', nullable: true })
  hospitalAffiliations: BilingualFormat;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

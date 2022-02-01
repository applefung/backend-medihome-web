import { UserRole, userRoles } from '@src/utils/auth';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

type Action = typeof actions[number];

const actions = ['RESET_PASSWORD', 'CHANGE_PASSWORD'];

export interface Details {
  key: string;
  oldValue: string;
  newValue: string;
}

@Entity()
export class UserLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ enum: userRoles })
  userRole: UserRole;

  @Column({ type: 'enum', enum: actions })
  action: Action;

  @Column('json', { nullable: true })
  details: Details;

  @CreateDateColumn()
  createdAt: Date;
}

import { BilingualFormat } from '@src/types/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ArticleTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  title: BilingualFormat;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

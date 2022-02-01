import { TokenType, tokenTypes } from '@src/utils/auth';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class TokenRecord {
  @PrimaryColumn({ length: 32 })
  token: string;

  @Column({ type: 'enum', enum: tokenTypes })
  type: TokenType;

  @Column({ length: 36, comment: 'Member ID' })
  id: string;

  @Column()
  expireAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

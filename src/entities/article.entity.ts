import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleTopic } from './article-topic.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  writer: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @ManyToOne(() => ArticleTopic)
  @JoinColumn()
  articleTopic: ArticleTopic;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

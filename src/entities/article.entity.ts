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
import { ArticleTag } from '.';
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

  @ManyToMany(() => ArticleTag, (articleTag) => articleTag.articles)
  @JoinTable()
  articleTags: ArticleTag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

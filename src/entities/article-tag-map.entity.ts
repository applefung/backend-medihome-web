import { BilingualFormat } from '@src/types/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article, ArticleTag } from '.';

@Entity()
export class ArticleTagMap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArticleTag)
  articleTag: ArticleTag;

  @ManyToMany(() => Article)
  article: Article;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTagsService } from '@src/article-tags/article-tags.service';
import { Article, ArticleTag, ArticleTopic } from '@src/entities';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleTopic, ArticleTag])],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleTagsService],
})
export class ArticlesModule {}

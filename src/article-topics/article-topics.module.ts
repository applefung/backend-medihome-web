import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTopic } from '@src/entities';
import { ArticleTopicsController } from './article-topics.controller';
import { ArticleTopicsService } from './article-topics.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleTopic])],
  controllers: [ArticleTopicsController],
  providers: [ArticleTopicsService],
})
export class ArticleTopicsModule {}

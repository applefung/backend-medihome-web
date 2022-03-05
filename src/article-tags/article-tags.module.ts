import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTag } from '@src/entities';
import { ArticleTagsController } from './article-tags.controller';
import { ArticleTagsService } from './article-tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleTag])],
  controllers: [ArticleTagsController],
  providers: [ArticleTagsService],
})
export class ArticleTagsModule {}

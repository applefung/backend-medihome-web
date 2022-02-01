import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carousel } from '@src/entities';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}

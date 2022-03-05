import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleDto } from './dtos';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles() {
    return this.articlesService.getArticles({ relations: ['articleTopic'] });
  }

  @Get(':id')
  getArticle(@Param('id') id: string) {
    return this.articlesService.getArticle({ id });
  }

  @Post()
  createArticle(@Body() data: ArticleDto) {
    return this.articlesService.createArticle(data);
  }

  @Patch(':id')
  async updateArticle(@Param('id') id: string, @Body() data: ArticleDto) {
    await this.articlesService.getArticleOrFail({ id });
    return this.articlesService.updateArticle(id, data);
  }

  @Delete(':id')
  async deletArticle(@Param('id') id: string) {
    await this.articlesService.getArticleOrFail({ id });
    return this.articlesService.deleteArticle(id);
  }
}

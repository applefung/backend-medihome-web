import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticleTagsService } from './article-tags.service';
import { ArticleTagDto } from './dtos';

@Controller('article-topics')
export class ArticleTagsController {
  constructor(private readonly articleTagsService: ArticleTagsService) {}

  @Get()
  getArticleTopics() {
    return this.articleTagsService.getArticleTags();
  }

  @Get(':id')
  getArticleTopic(@Param('id') id: string) {
    return this.articleTagsService.getArticleTag({ id });
  }

  @Post()
  createArticleTopic(@Body() data: ArticleTagDto) {
    return this.articleTagsService.createArticleTag(data);
  }

  @Patch(':id')
  async updateArticleTopic(
    @Param('id') id: string,
    @Body() data: ArticleTagDto,
  ) {
    await this.articleTagsService.getArticleTagOrFail({ id });
    return this.articleTagsService.updateArticleTag(id, data);
  }

  @Delete(':id')
  async deleteArticleTopic(@Param('id') id: string) {
    await this.articleTagsService.getArticleTagOrFail({ id });
    return this.articleTagsService.deleteArticleTag(id);
  }
}

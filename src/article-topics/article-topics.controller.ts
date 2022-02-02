import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticleTopicsService } from './article-topics.service';
import { ArticleTopicDto } from './dtos';

@Controller('article-topics')
export class ArticleTopicsController {
  constructor(private readonly articleTopicsService: ArticleTopicsService) {}

  @Get()
  getArticleTopics() {
    return this.articleTopicsService.getArticleTopics();
  }

  @Get(':id')
  getArticleTopic(@Param('id') id: string) {
    return this.articleTopicsService.getArticleTopic({ id });
  }

  @Post()
  createArticleTopic(@Body() data: ArticleTopicDto) {
    return this.articleTopicsService.createArticleTopic(data);
  }

  @Patch(':id')
  async updateArticleTopic(
    @Param('id') id: string,
    @Body() data: ArticleTopicDto,
  ) {
    await this.articleTopicsService.getArticleTopicOrFail({ id });
    return this.articleTopicsService.updateArticleTopic(id, data);
  }

  @Delete(':id')
  async deleteArticleTopic(@Param('id') id: string) {
    await this.articleTopicsService.getArticleTopicOrFail({ id });
    return this.articleTopicsService.deleteArticleTopic(id);
  }
}

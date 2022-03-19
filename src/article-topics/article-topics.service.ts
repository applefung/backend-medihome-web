import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleTopic } from '@src/entities';
import { getResponseByErrorCode } from '@src/utils/error';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

@Injectable()
export class ArticleTopicsService {
  constructor(
    @InjectRepository(ArticleTopic)
    private articleTopicsRepository: Repository<ArticleTopic>,
  ) {}

  getArticleTopics(options?: FindManyOptions<ArticleTopic>) {
    return this.articleTopicsRepository.find(options);
  }

  getArticleTopic(
    conditions: FindConditions<ArticleTopic>,
    options?: FindOneOptions<ArticleTopic>,
  ) {
    return this.articleTopicsRepository.findOne(conditions, options);
  }

  async getArticleTopicOrFail(
    conditions: FindConditions<ArticleTopic>,
    options?: FindOneOptions<ArticleTopic>,
  ) {
    const result = await this.articleTopicsRepository.findOne(
      conditions,
      options,
    );
    if (!result) {
      throw new NotFoundException(
        getResponseByErrorCode('ARTICLE_TOPIC_NOT_FOUND'),
      );
    }
    return result;
  }

  createArticleTopic(data: Pick<ArticleTopic, 'title'>) {
    return this.articleTopicsRepository.save(data);
  }

  async updateArticleTopic(id: string, data: Pick<ArticleTopic, 'title'>) {
    await this.articleTopicsRepository.update(id, data);
  }

  async deleteArticleTopic(id: string) {
    await this.articleTopicsRepository.delete(id);
  }
}

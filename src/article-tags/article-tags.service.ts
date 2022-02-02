import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleTag, ArticleTagMap } from '@src/entities';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ArticleTagsService {
  constructor(
    @InjectRepository(ArticleTag)
    private articleTagsRepository: Repository<ArticleTag>,
    @InjectRepository(ArticleTagMap)
    private articleTagMapsRepository: Repository<ArticleTagMap>,
  ) {}

  getArticleTags(options?: FindOneOptions<ArticleTag>) {
    return this.articleTagsRepository.find(options);
  }

  getArticleTag(
    conditions: FindConditions<ArticleTag>,
    options?: FindOneOptions<ArticleTag>,
  ) {
    return this.articleTagsRepository.findOne(conditions, options);
  }

  async getArticleTagOrFail(
    conditions: FindConditions<ArticleTag>,
    options?: FindOneOptions<ArticleTag>,
  ) {
    const result = await this.articleTagsRepository.findOne(
      conditions,
      options,
    );
    if (!result) {
      throw new NotFoundException(
        getResponseByErrorCode('ARTICLE_TAG_NOT_FOUND'),
      );
    }
    return result;
  }

  createArticleTag(data: Pick<ArticleTag, 'title'>) {
    return this.articleTagsRepository.save(data);
  }

  async updateArticleTag(id: string, data: Pick<ArticleTag, 'title'>) {
    await this.articleTagsRepository.update(id, data);
  }

  async deleteArticleTag(id: string) {
    await this.articleTagsRepository.softDelete(id);
  }

  async getArticleTagsByArticleId(id: string) {
    const result = await this.articleTagMapsRepository.find({ id });
    if (!result) {
      throw new NotFoundException(
        getResponseByErrorCode('ARTICLE_TAG_NOT_FOUND'),
      );
    }
    return result;
  }
}

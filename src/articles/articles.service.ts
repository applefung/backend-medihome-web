import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleTagsService } from '@src/article-tags/article-tags.service';
import { Article } from '@src/entities';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

interface ArticleParams extends Pick<Article, 'title' | 'content' | 'writer'> {
  topic: string;
  tags: string[];
}

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    private articleTagsService: ArticleTagsService,
  ) {}

  getArticles(options?: FindOneOptions<Article>) {
    return this.articlesRepository.find(options);
  }

  getArticle(
    conditions: FindConditions<Article>,
    options?: FindOneOptions<Article>,
  ) {
    return this.articlesRepository.findOne(conditions, options);
  }

  async getArticleOrFail(
    conditions: FindConditions<Article>,
    options?: FindOneOptions<Article>,
  ) {
    const result = await this.articlesRepository.findOne(conditions, options);
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('CAROUSEL_NOT_FOUND'));
    }
    return result;
  }

  async createArticle({ tags, ...data }: ArticleParams) {
    const articleTags = await Promise.all(
      tags.map(
        async (item) =>
          await this.articleTagsService.getArticleTag({
            id: item,
          }),
      ),
    );
    const currentArticle = this.articlesRepository.create(data);
    await this.articlesRepository.save({
      ...currentArticle,
      articleTags: articleTags,
    });
  }

  async updateArticle(id: string, data: ArticleParams) {
    await this.articlesRepository.update(id, data);
  }

  async deleteArticle(id: string) {
    await this.articlesRepository.delete(id);
  }
}

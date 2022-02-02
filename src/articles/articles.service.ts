import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleTagsService } from '@src/article-tags/article-tags.service';
import { Article, ArticleTag, ArticleTagMap } from '@src/entities';
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
    @InjectRepository(ArticleTagMap)
    private articlesTagMapRepository: Repository<ArticleTagMap>,
    private artcileTagsService: ArticleTagsService,
  ) {}
  async getArticles(options?: FindOneOptions<Article>) {
    const articles = await this.articlesRepository.find(options);
    const finalResult = await Promise.all(
      articles.map((item) => ({
        ...item,
        tags: this.artcileTagsService.getArticleTagsByArticleId(item.id),
      })),
    );
    return finalResult;
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
    const tags = await this.artcileTagsService.getArticleTagsByArticleId(
      result.id,
    );
    return {
      ...result,
      tags,
    };
  }

  async createArticle({ tags, ...data }: ArticleParams) {
    const currentArticle = this.articlesRepository.create(data);
    await this.articlesRepository.save(currentArticle);
    await Promise.all(
      tags.map(async (item) => {
        const articleTag = await this.artcileTagsService.getArticleTag({
          id: item,
        });
        this.createArticleTagMap({ articleTag, article: currentArticle });
      }),
    );
  }

  async updateArticle(id: string, { tags, ...data }: ArticleParams) {
    const article = await this.getArticleOrFail({ id });
    await this.articlesRepository.update(id, data);
    const currentTagMaps = await this.getArticleTagMapsByTagId(id);
    await Promise.all(
      currentTagMaps.map(({ articleTag }) => {
        if (!tags.includes(articleTag.id)) {
          this.deleteArticleTagMap({ articleTag });
        }
      }),
    );
    await Promise.all(
      tags.map(async (item) => {
        if (!currentTagMaps.find(({ articleTag }) => articleTag.id === item)) {
          const tag = await this.artcileTagsService.getArticleTagOrFail({
            id: item,
          });
          this.createArticleTagMap({
            articleTag: tag,
            article,
          });
        }
      }),
    );
  }

  async deleteArticle(id: string) {
    const article = await this.getArticleOrFail({ id });
    await this.articlesRepository.delete(id);
    this.deleteArticleTagMap({ article });
  }

  async createArticleTagMap({
    articleTag,
    article,
  }: Record<'articleTag', ArticleTag> & Record<'article', Article>) {
    this.articlesTagMapRepository.save({
      articleTag,
      article,
    });
  }

  getArticleTagMaps(options?: FindConditions<ArticleTagMap>) {
    return this.articlesTagMapRepository.find(options);
  }

  async getArticleTagMapsByTagId(id: string) {
    const tag = await this.artcileTagsService.getArticleTagOrFail({ id });
    return this.getArticleTagMaps({ articleTag: tag });
  }

  async deleteArticleTagMap(options: FindConditions<ArticleTagMap>) {
    await this.articlesTagMapRepository.delete(options);
  }
}

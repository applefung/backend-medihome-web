import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carousel } from '@src/entities';
import { getResponseByErrorCode } from '@src/utils/error';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

@Injectable()
export class CarouselsService {
  constructor(
    @InjectRepository(Carousel)
    private carouselsRepository: Repository<Carousel>,
  ) {}
  getCarousels(options?: FindManyOptions<Carousel>) {
    return this.carouselsRepository.find(options);
  }

  getCarousel(
    conditions: FindConditions<Carousel>,
    options?: FindOneOptions<Carousel>,
  ) {
    return this.carouselsRepository.findOne(conditions, options);
  }

  async getCarouselOrFail(
    conditions: FindConditions<Carousel>,
    options?: FindOneOptions<Carousel>,
  ) {
    const result = await this.carouselsRepository.findOne(conditions, options);
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('CAROUSEL_NOT_FOUND'));
    }
    return result;
  }

  createCarousel(data: Pick<Carousel, 'url'>) {
    return this.carouselsRepository.save(data);
  }

  async updateCarousel(id: string, data: Pick<Carousel, 'url'>) {
    await this.carouselsRepository.update(id, data);
  }

  async deleteCarousel(id: string) {
    await this.carouselsRepository.softDelete(id);
  }
}

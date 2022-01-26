import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carousel } from 'src/entities/carousels.entity';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CarouselsService {
  constructor(
    @InjectRepository(Carousel)
    private carouselsRepository: Repository<Carousel>,
  ) {}
  getCarousels() {
    return this.carouselsRepository.find();
  }

  getCarousel(conditions: FindConditions<Carousel>, options?: FindOneOptions<Carousel>) {
    return this.carouselsRepository.findOne(conditions, options);
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

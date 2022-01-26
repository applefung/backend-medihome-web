import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carousel } from 'src/entities/carousels.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarouselsService {
    constructor(
        @InjectRepository(Carousel)
        private carouselsRepository: Repository<Carousel>
        ) {}
  getCarousels() {
    return 'Hello World!';
  }

  createCarousel(data: Pick<Carousel, 'url'>) {
    return this.carouselsRepository.save(data);
  }
}

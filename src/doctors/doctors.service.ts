import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carousel } from 'src/entities/carousels.entity';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Carousel)
    private carouselsRepository: Repository<Carousel>,
  ) {}
  getDoctors() {
    return this.carouselsRepository.find();
  }
}

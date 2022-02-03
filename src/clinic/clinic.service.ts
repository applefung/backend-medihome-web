import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carousel } from '@src/entities';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Carousel)
    private carouselsRepository: Repository<Carousel>,
  ) {}
  getClinics(options?: FindOneOptions<Carousel>) {
    return this.carouselsRepository.find(options);
  }

  getClinic(
    conditions: FindConditions<Carousel>,
    options?: FindOneOptions<Carousel>,
  ) {
    return this.carouselsRepository.findOne(conditions, options);
  }

  async getClinicOrFail(
    conditions: FindConditions<Carousel>,
    options?: FindOneOptions<Carousel>,
  ) {
    const result = await this.carouselsRepository.findOne(conditions, options);
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('CAROUSEL_NOT_FOUND'));
    }
    return result;
  }

  createClinic(data: Pick<Carousel, 'url'>) {
    return this.carouselsRepository.save(data);
  }

  async updateClinic(id: string, data: Pick<Carousel, 'url'>) {
    await this.carouselsRepository.update(id, data);
  }

  async deleteClinic(id: string) {
    await this.carouselsRepository.softDelete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from 'src/entities/specialty.entity';
import { getResponseByErrorCode } from 'src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(Specialty)
    private specialtiesRepository: Repository<Specialty>,
  ) {}
  getSpecialties() {
    return this.specialtiesRepository.find();
  }

  getSpecialty(
    conditions: FindConditions<Specialty>,
    options?: FindOneOptions<Specialty>,
  ) {
    return this.specialtiesRepository.findOne(conditions, options);
  }

  async getSpecialtyOrFail(
    conditions: FindConditions<Specialty>,
    options?: FindOneOptions<Specialty>,
  ) {
    const result = await this.specialtiesRepository.findOne(
      conditions,
      options,
    );
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('CAROUSEL_NOT_FOUND'));
    }
    return result;
  }

  createSpecialty(data: Pick<Specialty, 'name'>) {
    return this.specialtiesRepository.save(data);
  }

  async updateSpecialty(id: string, data: Pick<Specialty, 'name'>) {
    await this.specialtiesRepository.update(id, data);
  }

  async deleteSpecialty(id: string) {
    await this.specialtiesRepository.softDelete(id);
  }
}

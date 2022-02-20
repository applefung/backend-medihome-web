import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mtr } from '@src/entities';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class MtrsService {
  constructor(
    @InjectRepository(Mtr)
    private mtrsRepository: Repository<Mtr>,
  ) {}
  getMtrs(options?: FindOneOptions<Mtr>) {
    return this.mtrsRepository.find(options);
  }

  getMtr(conditions: FindConditions<Mtr>, options?: FindOneOptions<Mtr>) {
    return this.mtrsRepository.findOne(conditions, options);
  }

  async getMtrOrFail(
    conditions: FindConditions<Mtr>,
    options?: FindOneOptions<Mtr>,
  ) {
    const result = await this.mtrsRepository.findOne(conditions, options);
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('CAROUSEL_NOT_FOUND'));
    }
    return result;
  }

  createMtr(data: Pick<Mtr, 'name' | 'exits'>) {
    return this.mtrsRepository.save(data);
  }

  async updateMtr(id: string, data: Pick<Mtr, 'name' | 'exits'>) {
    await this.mtrsRepository.update(id, data);
  }

  async deleteMtr(id: string) {
    await this.mtrsRepository.softDelete(id);
  }
}

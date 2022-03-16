import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from '@src/entities';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionsRepository: Repository<Region>,
  ) {}
  getRegions(options?: FindOneOptions<Region>) {
    return this.regionsRepository.find(options);
  }

  getRegion(
    conditions: FindConditions<Region>,
    options?: FindOneOptions<Region>,
  ) {
    return this.regionsRepository.findOne(conditions, options);
  }

  async getRegionOrFail(
    conditions: FindConditions<Region>,
    options?: FindOneOptions<Region>,
  ) {
    const result = await this.regionsRepository.findOne(conditions, options);
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('REGION_NOT_FOUND'));
    }
    return result;
  }

  createRegion(data: Pick<Region, 'name'>) {
    return this.regionsRepository.save(data);
  }

  async updateRegion(id: string, data: Pick<Region, 'name'>) {
    await this.regionsRepository.update(id, data);
  }

  async deleteRegion(id: string) {
    await this.regionsRepository.softDelete(id);
  }
}

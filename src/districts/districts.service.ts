import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from '@src/entities';
import { RegionsService } from '@src/regions/regions.service';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtsRepository: Repository<District>,
    private regionsService: RegionsService,
  ) {}
  getDistricts(options?: FindOneOptions<District>) {
    return this.districtsRepository.find(options);
  }

  getDistrict(
    conditions: FindConditions<District>,
    options?: FindOneOptions<District>,
  ) {
    return this.districtsRepository.findOne(conditions, options);
  }

  async getDistrictOrFail(
    conditions: FindConditions<District>,
    options?: FindOneOptions<District>,
  ) {
    const result = await this.districtsRepository.findOne(conditions, options);
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('DISTRICT_NOT_FOUND'));
    }
    return result;
  }

  async createDistrict({
    regionId,
    ...data
  }: Pick<District, 'name'> & Record<'regionId', string>) {
    const region = await this.regionsService.getRegionOrFail({ id: regionId });
    return this.districtsRepository.save({
      ...data,
      region,
    });
  }

  async updateDistrict(id: string, data: Pick<District, 'name'>) {
    await this.districtsRepository.update(id, data);
  }

  async deleteDistrict(id: string) {
    await this.districtsRepository.softDelete(id);
  }
}

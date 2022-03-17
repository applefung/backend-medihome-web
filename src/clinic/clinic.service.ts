import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DistrictsService } from '@src/districts/districts.service';
import { Clinic } from '@src/entities';
import { CreateClinicProps } from '@src/types/clinic';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicsRepository: Repository<Clinic>,
    private districtsService: DistrictsService,
  ) {}
  getClinics(options?: FindOneOptions<Clinic>) {
    return this.clinicsRepository.find(options);
  }

  getClinic(
    conditions: FindConditions<Clinic>,
    options?: FindOneOptions<Clinic>,
  ) {
    return this.clinicsRepository.findOne(conditions, options);
  }

  async getClinicOrFail(
    conditions: FindConditions<Clinic>,
    options?: FindOneOptions<Clinic>,
  ) {
    const result = await this.clinicsRepository.findOne(conditions, options);
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('CLINIC_NOT_FOUND'));
    }
    return result;
  }

  async createClinic({ districtId, ...data }: CreateClinicProps) {
    console.log('districtId', districtId);
    const district = await this.districtsService.getDistrictOrFail({
      id: districtId,
    });
    return this.clinicsRepository.save({
      ...data,
      district,
    });
  }

  async updateClinic(id: string, data: Partial<Clinic>) {
    await this.clinicsRepository.update(id, data);
  }

  async deleteClinic(id: string) {
    await this.clinicsRepository.softDelete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from '@src/entities';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicsRepository: Repository<Clinic>,
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

  createClinic(data: Partial<Clinic>) {
    return this.clinicsRepository.save(data);
  }

  async updateClinic(id: string, data: Partial<Clinic>) {
    await this.clinicsRepository.update(id, data);
  }

  async deleteClinic(id: string) {
    await this.clinicsRepository.softDelete(id);
  }
}

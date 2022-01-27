import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carousel } from 'src/entities/carousels.entity';
import { Doctor } from 'src/entities/doctors.entity';
import { getResponseByErrorCode } from 'src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}
  getDoctors() {
    return this.doctorsRepository.find();
  }

  getDoctor(
    conditions: FindConditions<Doctor>,
    options?: FindOneOptions<Doctor>,
  ) {
    return this.doctorsRepository.findOne(conditions, options);
  }

  async getDoctorOrFail(
    conditions: FindConditions<Doctor>,
    options?: FindOneOptions<Doctor>,
  ) {
    const result = await this.doctorsRepository.findOne(conditions, options);
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('CAROUSEL_NOT_FOUND'));
    }
    return result;
  }

  createDoctor(data: Partial<Doctor>) {
    return this.doctorsRepository.save(data);
  }

  async updateDoctor(id: string, data: Partial<Doctor>) {
    await this.doctorsRepository.update(id, data);
  }

  async deleteDoctor(id: string) {
    await this.doctorsRepository.softDelete(id);
  }
}

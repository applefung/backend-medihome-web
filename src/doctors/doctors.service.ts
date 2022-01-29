import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carousel } from 'src/entities/carousels.entity';
import { Doctor } from 'src/entities/doctors.entity';
import { OrderType } from 'src/types/common';
import { Order } from 'src/utils/common';
import { DoctorField } from 'src/utils/doctor';
import { getResponseByErrorCode } from 'src/utils/error';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  MoreThan,
  Repository,
} from 'typeorm';

interface GetDoctorsParams {
  specialty: string;
  district: string;
  search: string;
  page: string;
  limit: string;
  order: Order;
  orderBy: DoctorField;
}

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}
  getDoctors({
    specialty,
    district,
    search,
    page = '1',
    limit = '5',
    order = 'DESC',
    orderBy = 'id',
  }: GetDoctorsParams) {
    // limit
    const take = parseInt(limit);
    // offset
    const skip = (parseInt(page) - 1) * take;
    let whereOptions = '';
    if (specialty) {
      whereOptions = `specialty: ${specialty},`;
    }
    if (district) {
      whereOptions = `${whereOptions}district: ${district},`;
    }
    if (search) {
      whereOptions = `${whereOptions}CAST(name->'tc' AS varchar) ilike '%${search}%' or CAST(name->'en' AS varchar) ilike '%${search}%' 
      or (CASE 
        WHEN "qualifications" IS NOT NULL  
        THEN (CAST("qualifications"->'tc' AS varchar) ilike '%${search}%' or CAST("qualifications"->'en' AS varchar) ilike '%${search}%') END) 
      or (CASE 
        WHEN "hospitalAffiliations" IS NOT NULL 
        THEN (CAST("hospitalAffiliations"->'tc' AS varchar) ilike '%${search}%' or CAST("hospitalAffiliations"->'en' AS varchar) ilike '%${search}%') END)`;
    }

    return this.doctorsRepository
      .createQueryBuilder()
      .where(whereOptions)
      .take(take)
      .skip(skip)
      .orderBy(orderBy, order as OrderType)
      .getManyAndCount();
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

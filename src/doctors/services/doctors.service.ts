import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicsService } from '@src/clinic/clinic.service';
import { Clinic, Doctor } from '@src/entities';
import type { OrderType } from '@src/types/common';
import { Order } from '@src/utils/common';
import { DoctorField } from '@src/utils/doctor';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

interface GetDoctorsParams {
  specialty: string;
  district: string;
  search: string;
  page: string;
  limit: string;
  order: Order;
  orderBy: DoctorField;
}

interface DoctorProps extends Omit<Doctor, 'clinics'> {
  clinics: Partial<Clinic>[];
}

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    private clinicsService: ClinicsService,
  ) {}
  async getDoctors({
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

    const result = await this.doctorsRepository
      .createQueryBuilder('doctor')
      // .innerJoin('doctor.clinics', 'clinics')
      .where(whereOptions)
      .take(take)
      .skip(skip)
      .orderBy(orderBy, order as OrderType)
      .getMany();

    const data = await Promise.all(
      result.map(async (item: Doctor) => ({
        ...item,
        // clinics: await this.getClinicsByDoctorId(item.id),
      })),
    );

    return {
      data,
      count: result.length,
    };
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
      throw new NotFoundException(getResponseByErrorCode('DOCTOR_NOT_FOUND'));
    }
    return result;
  }

  async createDoctor({ clinics, ...data }: Partial<DoctorProps>) {
    await this.doctorsRepository.save({
      ...data,
      clinics: clinics.map((item) =>
        this.clinicsService.createClinicData(item),
      ),
    });
  }

  async updateDoctor(id: string, data: Partial<DoctorProps>) {
    await this.doctorsRepository.update(id, data);
  }

  async deleteDoctor(id: string) {
    await this.doctorsRepository.softDelete(id);
  }
}

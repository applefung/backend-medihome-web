import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicsService } from '@src/clinic/clinic.service';
import { Clinic, Doctor, DoctorClinicMap } from '@src/entities';
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

type DoctorParams = Partial<Doctor> & Record<'clinics', Partial<Clinic>[]>;
@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    @InjectRepository(DoctorClinicMap)
    private doctorClinicMapRepository: Repository<DoctorClinicMap>,
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
      .createQueryBuilder()
      .where(whereOptions)
      .take(take)
      .skip(skip)
      .orderBy(orderBy, order as OrderType)
      .getMany();

    const data = await Promise.all(
      result.map(async (item: Doctor) => ({
        ...item,
        clinics: await this.getClinicsByDoctorId(item.id),
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

  async getClinicsByDoctorId(id: string) {
    const doctor = await this.getDoctor({ id });
    return this.doctorClinicMapRepository.find({ doctor });
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

  async createDoctor({ clinics, ...data }: DoctorParams) {
    const doctor = await this.doctorsRepository.save(data);
    await Promise.all(
      clinics.map(async (item) => {
        const clinic = await this.clinicsService.createClinic(item);
        await this.createDoctorClinicMap({
          clinicId: clinic.id,
          doctorId: doctor.id,
        });
      }),
    );
  }

  async createDoctorClinicMap({
    clinicId,
    doctorId,
  }: Record<'clinicId' | 'doctorId', string>) {
    const clinic = await this.clinicsService.getClinicOrFail({ id: clinicId });
    const doctor = await this.getDoctorOrFail({ id: doctorId });
    return this.doctorClinicMapRepository.create({ clinic, doctor });
  }

  async updateDoctor(id: string, data: DoctorParams) {
    await this.doctorsRepository.update(id, data);
  }

  async deleteDoctor(id: string) {
    await this.doctorsRepository.softDelete(id);
  }
}

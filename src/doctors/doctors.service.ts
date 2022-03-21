import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicsService } from '@src/clinic/clinic.service';
import { DoctorCommentsService } from '@src/doctor-users/services/doctor-comments.service';
import { Doctor } from '@src/entities';
import { SpecialtiesService } from '@src/specialties/specialties.service';
import { CreateClinicProps } from '@src/types/clinic';
import type { OrderType } from '@src/types/common';
import { Order } from '@src/utils/common';
import { DoctorField } from '@src/utils/doctor';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

interface GetDoctorsParams {
  specialtyId: string;
  districtId: string;
  search: string;
  page: string;
  limit: string;
  order: Order;
  orderBy: DoctorField;
}

interface DoctorProps extends Omit<Doctor, 'clinics'> {
  clinics: CreateClinicProps;
  specialtyId: string;
}

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    private clinicsService: ClinicsService,
    private specialtiesService: SpecialtiesService,
    private doctorCommentsService: DoctorCommentsService,
  ) {}
  async getDoctors({
    specialtyId,
    districtId,
    search,
    page = '1',
    limit = '5',
    order = 'DESC',
    orderBy = 'doctor.id',
  }: GetDoctorsParams) {
    // limit
    const take = parseInt(limit);
    // offset
    const skip = (parseInt(page) - 1) * take;
    let whereOptions = '';
    if (specialtyId) {
      whereOptions = `specialty.id = '${specialtyId}'`;
    }
    if (districtId) {
      whereOptions = `clinics.district.id = '${districtId}'`;
    }
    if (search) {
      whereOptions = `CAST(doctor.name->'tc' AS varchar) ilike '%${search}%' or CAST(doctor.name->'en' AS varchar) ilike '%${search}%' 
      or (CASE 
        WHEN doctor.qualifications IS NOT NULL  
        THEN (CAST(doctor.qualifications->'tc' AS varchar) ilike '%${search}%' or CAST(doctor.qualifications->'en' AS varchar) ilike '%${search}%') END) 
      or (CASE 
        WHEN doctor."hospitalAffiliations" IS NOT NULL 
        THEN (CAST(doctor."hospitalAffiliations"->'tc' AS varchar) ilike '%${search}%' or CAST(doctor."hospitalAffiliations"->'en' AS varchar) ilike '%${search}%') END)
      or (CASE 
        WHEN doctor.services IS NOT NULL 
        THEN (CAST(doctor.services->'tc' AS varchar) ilike '%${search}%' or CAST(doctor."services"->'en' AS varchar) ilike '%${search}%') END)
      or (CAST(specialty.name->'tc'AS varchar) ilike '%${search}%' or CAST(specialty.name->'en'AS varchar) ilike '%${search}%')`;
    }

    const result = await this.doctorsRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.specialty', 'specialty')
      .leftJoinAndSelect('doctor.clinics', 'clinics')
      .leftJoinAndSelect('clinics.district', 'district')
      .leftJoinAndSelect('doctor.doctorUser', 'doctorUser')
      .where(whereOptions)
      .take(take)
      .skip(skip)
      .orderBy(orderBy, order as OrderType)
      .getMany();

    const finalResult = await Promise.all(
      result.map(async ({ doctorUser, ...item }) => {
        if (doctorUser) {
          const doctorComments =
            await this.doctorCommentsService.getDoctorCommentsByDoctorId(
              doctorUser.id,
            );

          const rating =
            doctorComments
              .map(({ rating }) => rating)
              .reduce((prev, curr) => prev + curr) / doctorComments.length;

          return {
            rating,
            ...item,
          };
        }
        return {
          ...item,
        };
      }),
    );

    return {
      ...finalResult,
      count: finalResult.length,
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

  async createDoctor({ clinics, specialtyId, ...data }: Partial<DoctorProps>) {
    const specialty = await this.specialtiesService.getSpecialtyOrFail({
      id: specialtyId,
    });

    const currentClinicIds = clinics
      .filter(({ id }) => !!id)
      .map(({ id }) => id);

    const currentClinics = await Promise.all(
      currentClinicIds.map(
        async (item) => await this.clinicsService.getClinic({ id: item }),
      ),
    );

    if (currentClinics.includes(undefined)) {
      throw new NotFoundException(getResponseByErrorCode('CLINIC_NOT_FOUND'));
    }

    const newClinics = clinics.filter(
      ({ id }) => !currentClinicIds.includes(id),
    );

    const createdClinics = await Promise.all(
      newClinics.map(
        async (item) => await this.clinicsService.createClinic(item),
      ),
    );

    await this.doctorsRepository.save({
      ...data,
      specialty,
      clinics: [...currentClinics, ...createdClinics].flat(),
    });
  }

  async updateDoctor(id: string, data: Partial<DoctorProps>) {
    await this.doctorsRepository.update(id, data);
  }

  async deleteDoctor(id: string) {
    await this.doctorsRepository.softDelete(id);
  }
}

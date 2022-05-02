import { Injectable, NotFoundException } from '@nestjs/common';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicsService } from '@src/clinic/clinic.service';
import { DoctorUsersService } from '@src/doctor-users/services/doctor-users.service';
import { DoctorCommentsService } from '@src/doctor-users/services/doctor-comments.service';
import { Doctor } from '@src/entities';
import { SpecialtiesService } from '@src/specialties/specialties.service';
import { CreateClinicProps } from '@src/types/clinic';
import type { OrderType } from '@src/types/common';
import { Order } from '@src/utils/common';
import { DoctorField } from '@src/utils/doctor';
import { getResponseByErrorCode } from '@src/utils/error';

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
    private doctorUsersService: DoctorUsersService,
  ) {}
  async getDoctorsWithPagination({
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
      whereOptions = `${
        whereOptions ? `${whereOptions} AND ` : ''
      }clinics.district.id = '${districtId}'`;
    }
    if (search) {
      whereOptions = `${whereOptions ? `${whereOptions} AND ` : ''}
        CAST(CONCAT(doctor.name->'firstName'->'tc', doctor.name->'lastName'->'tc') AS varchar) ilike '%${search}%' or CAST(CONCAT(doctor.name->'firstName'->'en', doctor.name->'lastName'->'en') AS varchar) ilike '%${search}%' 
      or CAST(CONCAT(doctor.name->'lastName'->'tc', doctor.name->'firstName'->'tc') AS varchar) ilike '%${search}%' or CAST(CONCAT(doctor.name->'lastName'->'en', doctor.name->'firstName'->'en') AS varchar) ilike '%${search}%' 
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
      .where(whereOptions)
      .take(take)
      .skip(skip)
      .orderBy(orderBy, order as OrderType)
      .getMany();

    const finalResult = await Promise.all(
      result.map(async ({ id, ...item }) => {
        const doctorUser = await this.doctorUsersService.getDoctorUser(
          {
            doctor: { id },
          },
          { relations: ['doctorClinicReservationTimeslot'] },
        );

        if (doctorUser) {
          const doctorComments =
            await this.doctorCommentsService.getDoctorCommentsByDoctorId(
              doctorUser.id,
            );
          const rating =
            (doctorComments
              .map(({ rating }) => rating)
              .reduce((prev, curr) => prev + curr, 0) ?? 0) /
            doctorComments.length;

          return {
            rating,
            id,
            ...item,
            reservationTimeslots: doctorUser.doctorClinicReservationTimeslot,
          };
        }
        return {
          rating: 0,
          id,
          ...item,
          reservationTimeslots: [],
        };
      }),
    );

    return {
      data: finalResult,
      count: finalResult.length,
    };
  }

  getDoctors(options?: FindManyOptions<Doctor>) {
    return this.doctorsRepository.find(options);
  }

  getDoctor(
    conditions: FindConditions<Doctor>,
    options?: FindOneOptions<Doctor>,
  ) {
    return this.doctorsRepository.findOneOrFail(conditions, options);
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
    await this.doctorsRepository.save({
      ...data,
      specialty,
      clinics: await this.clinicsService.getCreatedClinicData(clinics),
    });
  }

  async updateDoctor(id: string, data: Partial<DoctorProps>) {
    await this.doctorsRepository.update(id, data);
  }

  async deleteDoctor(id: string) {
    await this.doctorsRepository.softDelete(id);
  }
}

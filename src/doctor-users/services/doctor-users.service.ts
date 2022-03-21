import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic, Doctor, DoctorUser } from '@src/entities';
import { SpecialtiesService } from '@src/specialties/specialties.service';
import { encryptPassword } from '@src/utils/auth';
import { getResponseByErrorCode } from '@src/utils/error';
import {
  DeepPartial,
  FindConditions,
  FindOneOptions,
  Repository,
} from 'typeorm';

type DoctorUserInfo = Pick<DoctorUser, 'email' | 'password'> &
  Pick<
    Doctor,
    | 'name'
    | 'contacts'
    | 'gender'
    | 'hospitalAffiliations'
    | 'languages'
    | 'qualifications'
    | 'services'
  >;
interface CreateDoctorUserParam extends DoctorUserInfo {
  specialtyId: string;
  clinics: Partial<Clinic>[];
}
@Injectable()
export class DoctorUsersService {
  constructor(
    @InjectRepository(DoctorUser)
    private doctorUsersRepository: Repository<DoctorUser>,
    private specialtiesService: SpecialtiesService,
  ) {}
  // ! May need pagination
  getDoctorUsers(options?: FindOneOptions<DoctorUser>) {
    return this.doctorUsersRepository.find(options);
  }

  getDoctorUser(
    conditions: FindConditions<DoctorUser>,
    options?: FindOneOptions<DoctorUser>,
  ) {
    return this.doctorUsersRepository.findOne(conditions, options);
  }

  async getDoctorUserOrFail(
    conditions: FindConditions<DoctorUser>,
    options?: FindOneOptions<DoctorUser>,
  ) {
    const result = await this.doctorUsersRepository.findOne(
      conditions,
      options,
    );
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('CAROUSEL_NOT_FOUND'));
    }
    return result;
  }

  async createDoctorUser({
    email,
    password,
    specialtyId,
    clinics,
    ...data
  }: CreateDoctorUserParam) {
    const specialty = await this.specialtiesService.getSpecialtyOrFail({
      id: specialtyId,
    });
    return this.doctorUsersRepository.save({
      email,
      password: await encryptPassword(password),
      doctor: {
        ...data,
        specialty,
        clinics,
      },
    });
  }

  async updateDoctorUser(id: string, data: DeepPartial<DoctorUser>) {
    await this.doctorUsersRepository.update(id, data);
  }

  async deleteDoctorUser(id: string) {
    await this.doctorUsersRepository.softDelete(id);
  }
}

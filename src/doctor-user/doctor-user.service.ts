import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor, DoctorUser } from '@src/entities';
import { getResponseByErrorCode } from '@src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DoctorUsersService {
  constructor(
    @InjectRepository(DoctorUser)
    private doctorUsersRepository: Repository<DoctorUser>,
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

  createDoctorUser(
    data: Pick<DoctorUser, 'email' | 'password'> &
      Pick<
        Doctor,
        | 'name'
        | 'contacts'
        | 'gender'
        | 'hospitalAffiliations'
        | 'languages'
        | 'qualifications'
        | 'services'
      >,
  ) {
    return this.doctorUsersRepository.save(data);
  }

  async updateDoctorUser(id: string, data: Partial<DoctorUser>) {
    await this.doctorUsersRepository.update(id, data);
  }

  async deleteDoctorUser(id: string) {
    await this.doctorUsersRepository.softDelete(id);
  }
}

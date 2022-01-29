import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientUser } from 'src/entities';
import { getResponseByErrorCode } from 'src/utils/error';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PatientUsersService {
  constructor(
    @InjectRepository(PatientUser)
    private patientUsersRepository: Repository<PatientUser>,
  ) {}
  // ! May need pagination
  getPatientUsers() {
    return this.patientUsersRepository.find();
  }

  getPatientUser(
    conditions: FindConditions<PatientUser>,
    options?: FindOneOptions<PatientUser>,
  ) {
    return this.patientUsersRepository.findOne(conditions, options);
  }

  async getPatientUserOrFail(
    conditions: FindConditions<PatientUser>,
    options?: FindOneOptions<PatientUser>,
  ) {
    const result = await this.patientUsersRepository.findOne(
      conditions,
      options,
    );
    if (!result) {
      throw new NotFoundException(getResponseByErrorCode('CAROUSEL_NOT_FOUND'));
    }
    return result;
  }

  createPatientUser(data: Partial<PatientUser>) {
    return this.patientUsersRepository.save(data);
  }

  async updatPatientUser(id: string, data: Partial<PatientUser>) {
    await this.patientUsersRepository.update(id, data);
  }

  async deletePatientUser(id: string) {
    await this.patientUsersRepository.softDelete(id);
  }
}

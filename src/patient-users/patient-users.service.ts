import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientUser } from '@src/entities';
import { UserLog } from '@src/entities/user-log.entity';
import { encryptPassword } from '@src/utils/auth';
import { getResponseByErrorCode } from '@src/utils/error';
import {
  DeepPartial,
  FindConditions,
  FindOneOptions,
  Repository,
} from 'typeorm';

@Injectable()
export class PatientUsersService {
  constructor(
    @InjectRepository(PatientUser)
    private patientUsersRepository: Repository<PatientUser>,
    @InjectRepository(UserLog)
    private userLogRepository: Repository<UserLog>,
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
      throw new NotFoundException(
        getResponseByErrorCode('PATIENT_USER_NOT_FOUND'),
      );
    }
    return result;
  }

  async createPatientUser({ password, ...data }: DeepPartial<PatientUser>) {
    return this.patientUsersRepository.save({
      password: await encryptPassword(password),
      ...data,
    });
  }

  async updatPatientUser(
    id: string,
    data: DeepPartial<PatientUser>,
    log?: Pick<UserLog, 'userRole' | 'details' | 'action'>,
  ) {
    await this.getPatientUserOrFail({ id });
    await this.patientUsersRepository.update(id, data);

    if (log) {
      await this.userLogRepository.save({
        userId: id,
        userRole: log.userRole,
        details: log.details,
        action: log.action,
      });
    }
  }

  async updateAvatar(id: string, file: Express.Multer.File) {
    await this.patientUsersRepository.update(id, {
      patientProfile: { avatar: file.buffer },
    });
  }

  async updatePassword(id: string, password: string) {
    const currentPatientUser = await this.getPatientUserOrFail({ id });
    await this.updatPatientUser(
      id,
      { password },
      {
        userRole: 'patient',
        action: 'CHANGE_PASSWORD',
        details: {
          key: 'password',
          oldValue: currentPatientUser.password,
          newValue: password,
        },
      },
    );
  }

  async deletePatientUser(id: string) {
    await this.patientUsersRepository.softDelete(id);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorUsersModule } from '@src/doctor-users/doctor-users.module';
import { DoctorsModule } from '@src/doctors/doctors.module';
import {
  PatientUser,
  PatientProfile,
  UserLog,
  ReservationRecord,
  DoctorComment,
} from '@src/entities';
import { PatientUsersController } from './controllers/patient-users.controller';
import { ReservationRecordController } from './controllers/reservation-record.controller';
import { PatientUsersService } from './services/patient-users.service';
import { ReservationRecordService } from './services/reservation-record.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatientUser,
      PatientProfile,
      UserLog,
      ReservationRecord,
      DoctorComment,
    ]),
    DoctorUsersModule,
  ],
  controllers: [PatientUsersController, ReservationRecordController],
  providers: [PatientUsersService, ReservationRecordService],
  exports: [PatientUsersService],
})
export class PatientUsersModule {}

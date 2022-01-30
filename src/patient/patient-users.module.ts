import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientUser, PatientProfile } from '@src/entities';
import { PatientUsersController } from './patient-users.controller';
import { PatientUsersService } from './patient-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientUser, PatientProfile])],
  controllers: [PatientUsersController],
  providers: [PatientUsersService],
})
export class PatientsModule {}

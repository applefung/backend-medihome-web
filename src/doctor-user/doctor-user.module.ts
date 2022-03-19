import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorUser } from '@src/entities';
import { PatientUsersModule } from '@src/patient-users/patient-users.module';
import { DoctorUsersController } from './controllers/doctor-user.controller';
import { DoctorUsersService } from './services/doctor-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorUser]), PatientUsersModule],
  controllers: [DoctorUsersController],
  providers: [DoctorUsersService],
})
export class DoctorUsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsModule } from '@src/clinic/clinic.module';
import { DoctorComment, DoctorUser } from '@src/entities';
import { PatientUsersModule } from '@src/patient-users/patient-users.module';
import { SpecialtiesModule } from '@src/specialties/specialties.module';
import { DoctorCommentsController } from './controllers/doctor-comments.controller';
import { DoctorUsersController } from './controllers/doctor-users.controller';
import { DoctorCommentsService } from './services/doctor-comments.service';
import { DoctorUsersService } from './services/doctor-users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorUser, DoctorComment]),
    SpecialtiesModule,
    PatientUsersModule,
    ClinicsModule,
  ],
  controllers: [DoctorUsersController, DoctorCommentsController],
  providers: [DoctorUsersService, DoctorCommentsService],
  exports: [DoctorUsersService, DoctorCommentsService],
})
export class DoctorUsersModule {}

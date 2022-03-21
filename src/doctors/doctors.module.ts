import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsModule } from '@src/clinic/clinic.module';
import { DoctorUsersModule } from '@src/doctor-users/doctor-users.module';
import { Clinic, District, Doctor, Region } from '@src/entities';
import { SpecialtiesModule } from '@src/specialties/specialties.module';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, District, Region, Clinic]),
    ClinicsModule,
    SpecialtiesModule,
    DoctorUsersModule,
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}

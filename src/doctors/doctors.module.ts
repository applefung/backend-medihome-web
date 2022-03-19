import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsModule } from '@src/clinic/clinic.module';
import { Clinic, District, Doctor, Region } from '@src/entities';
import { SpecialtiesModule } from '@src/specialties/specialties.module';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, District, Region, Clinic]),
    ClinicsModule,
    SpecialtiesModule,
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}

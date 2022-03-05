import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsModule } from '@src/clinic/clinic.module';
import { Clinic, District, Doctor, Region } from '@src/entities';
import { DoctorsController } from './controllers/doctors.controller';
import { DoctorsService } from './services/doctors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, District, Region, Clinic]),
    ClinicsModule,
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}

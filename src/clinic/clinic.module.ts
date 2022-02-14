import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from '@src/doctors/doctors.module';
import { Clinic } from '@src/entities';
import { ClinicsController } from './clinic.controller';
import { ClinicsService } from './clinic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic]), DoctorsModule],
  controllers: [ClinicsController],
  providers: [ClinicsService],
})
export class ClinicsModule {}

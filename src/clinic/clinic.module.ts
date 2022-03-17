import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictsModule } from '@src/districts/districts.module';
import { Clinic } from '@src/entities';
import { ClinicsController } from './clinic.controller';
import { ClinicsService } from './clinic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic]), DistrictsModule],
  controllers: [ClinicsController],
  providers: [ClinicsService],
  exports: [ClinicsService],
})
export class ClinicsModule {}

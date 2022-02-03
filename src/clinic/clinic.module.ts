import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carousel } from '@src/entities';
import { ClinicsController } from './clinic.controller';
import { ClinicsService } from './clinic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel])],
  controllers: [ClinicsController],
  providers: [ClinicsService],
})
export class ClinicsModule {}

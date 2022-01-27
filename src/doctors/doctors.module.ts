import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carousel } from 'src/entities/carousels.entity';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}

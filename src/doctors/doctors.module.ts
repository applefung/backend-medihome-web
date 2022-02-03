import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District, Doctor, Region } from '@src/entities';
import { DoctorsController } from './controllers/doctors.controller';
import { DoctorsService } from './services/doctors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, District, Region])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}

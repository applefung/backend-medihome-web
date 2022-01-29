import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carousel } from 'src/entities/carousels.entity';
import { PatientUsersController } from './patient-users.controller';
import { PatientUsersService } from './patient-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel])],
  controllers: [PatientUsersController],
  providers: [PatientUsersService],
})
export class PatientsModule {}

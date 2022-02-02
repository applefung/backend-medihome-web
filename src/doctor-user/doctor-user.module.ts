import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorUser } from '@src/entities';
import { DoctorUsersController } from './doctor-user.controller';
import { DoctorUsersService } from './doctor-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorUser])],
  controllers: [DoctorUsersController],
  providers: [DoctorUsersService],
})
export class DoctorUsersModule {}

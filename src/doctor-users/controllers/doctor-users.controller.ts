import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DoctorUsersService } from '../services/doctor-users.service';
import { DoctorUserDto, UpdateDoctorUserDto } from '../dtos';
import { formatReservationTime } from '@src/utils/clinic';
import { Gender } from '@src/utils/common';

@Controller('doctor-users')
export class DoctorUsersController {
  constructor(private readonly doctorUsersService: DoctorUsersService) {}

  @Get()
  getDoctorUsers() {
    return this.doctorUsersService.getDoctorUsers();
  }

  @Get(':id')
  getDoctorUser(@Param('id') id: string) {
    return this.doctorUsersService.getDoctorUser({ id });
  }

  @Post()
  createDoctorUser(@Body() { gender, clinics, ...data }: DoctorUserDto) {
    return this.doctorUsersService.createDoctorUser({
      ...data,
      gender: gender.toUpperCase() as Gender,
      clinics: clinics.map(({ reservationTime, ...item }) => ({
        ...item,
        ...(reservationTime && {
          reservationTime: formatReservationTime(reservationTime),
        }),
      })),
    });
  }

  @Patch(':id')
  async updateDoctorUser(
    @Param('id') id: string,
    @Body() data: UpdateDoctorUserDto,
  ) {
    await this.doctorUsersService.getDoctorUserOrFail({ id });
    return this.doctorUsersService.updateDoctorUser(id, data);
  }

  @Delete(':id')
  async deleteDoctorUser(@Param('id') id: string) {
    await this.doctorUsersService.getDoctorUserOrFail({ id });
    return this.doctorUsersService.deleteDoctorUser(id);
  }
}

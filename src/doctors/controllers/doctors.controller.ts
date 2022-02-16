import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DoctorsService } from '../services/doctors.service';
import { DoctorDto, GetDoctorsDto } from '../dtos';
import { formatReservationTime } from '@src/utils/clinic';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  getDoctors(
    @Query()
    data: GetDoctorsDto,
  ) {
    return this.doctorsService.getDoctors(data);
  }

  @Get(':id')
  getDoctor(@Param('id') id: string) {
    return this.doctorsService.getDoctor({ id });
  }

  @Post()
  createDoctor(@Body() { clinics, ...data }: DoctorDto) {
    return this.doctorsService.createDoctor({
      ...data,
      clinics: clinics.map(({ reservationTime, ...item }) => ({
        ...item,
        reservationTime: formatReservationTime(reservationTime),
      })),
    });
  }

  @Patch(':id')
  async updateDoctor(
    @Param('id') id: string,
    @Body() { clinics, ...data }: DoctorDto,
  ) {
    await this.doctorsService.getDoctorOrFail({ id });
    return this.doctorsService.updateDoctor(id, {
      ...data,
      clinics: clinics.map(({ reservationTime, ...item }) => ({
        ...item,
        reservationTime: formatReservationTime(reservationTime),
      })),
    });
  }

  @Delete(':id')
  async deleteDoctor(@Param('id') id: string) {
    await this.doctorsService.getDoctorOrFail({ id });
    return this.doctorsService.deleteDoctor(id);
  }
}

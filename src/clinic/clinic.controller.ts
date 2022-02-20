import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { formatReservationTime } from '@src/utils/clinic';
import { ClinicsService } from './clinic.service';
import { CreateClinicDto, UpdateClinicDto } from './dtos';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  getClinics() {
    return this.clinicsService.getClinics();
  }

  @Get('/doctors/:id')
  getClinicsByDoctorId(@Param('id') id: string) {
    return this.clinicsService.getClinic({ id });
  }

  @Get(':id')
  getClinic(@Param('id') id: string) {
    return this.clinicsService.getClinic({ id });
  }

  @Post()
  createClinic(@Body() { reservationTime, ...data }: CreateClinicDto) {
    return this.clinicsService.createClinic({
      ...(reservationTime && {
        reservationTime: formatReservationTime(reservationTime),
      }),
      ...data,
    });
  }

  @Patch(':id')
  async updateClinic(
    @Param('id') id: string,
    @Body() { reservationTime, ...data }: UpdateClinicDto,
  ) {
    await this.clinicsService.getClinicOrFail({ id });
    return this.clinicsService.updateClinic(id, {
      ...(reservationTime && {
        reservationTime: formatReservationTime(reservationTime),
      }),
      ...data,
    });
  }

  @Delete(':id')
  async deleteClinic(@Param('id') id: string) {
    await this.clinicsService.getClinicOrFail({ id });
    return this.clinicsService.deleteClinic(id);
  }
}

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
import { DoctorsService } from './doctors.service';
import { DoctorDto, GetDoctorsDto } from './dtos';
import { formatReservationTime } from '@src/utils/clinic';
import { Gender } from '@src/utils/common';
import { isUUID } from 'class-validator';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  getDoctorsWithPagination(
    @Query()
    { specialtyId, districtId, search, ...data }: GetDoctorsDto,
  ) {
    if (
      (!isUUID(specialtyId) && !districtId) ||
      (!isUUID(districtId) && !specialtyId) ||
      (!isUUID(specialtyId) && !isUUID(districtId) && !search)
    ) {
      return {
        data: [],
        count: 0,
      };
    }
    return this.doctorsService.getDoctorsWithPagination({
      specialtyId,
      districtId,
      search,
      ...data,
    });
  }

  @Get('/ids')
  getDoctorIds() {
    return this.doctorsService.getDoctors({ select: ['id'] });
  }

  @Get(':id')
  async getDoctor(@Param('id') id: string) {
    if (!isUUID(id)) {
      return null;
    }
    const doctor = await this.doctorsService.getDoctor(
      { id },
      { relations: ['clinics', 'clinics.district', 'specialty'] },
    );
    if (!doctor) {
      return null;
    }
    return doctor;
  }

  @Post()
  createDoctor(@Body() { clinics, gender, ...data }: DoctorDto) {
    return this.doctorsService.createDoctor({
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
  async updateDoctor(
    @Param('id') id: string,
    @Body() { clinics, gender, ...data }: DoctorDto,
  ) {
    await this.doctorsService.getDoctorOrFail({ id });
    return this.doctorsService.updateDoctor(id, {
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

  @Delete(':id')
  async deleteDoctor(@Param('id') id: string) {
    await this.doctorsService.getDoctorOrFail({ id });
    return this.doctorsService.deleteDoctor(id);
  }
}

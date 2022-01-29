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
import { DoctorDto } from './dtos';
import { GetDoctorsDto } from './dtos/get-doctors-dto';

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
  createDoctor(@Body() data: DoctorDto) {
    return this.doctorsService.createDoctor(data);
  }

  @Patch(':id')
  async updateDoctor(@Param('id') id: string, @Body() data: DoctorDto) {
    await this.doctorsService.getDoctorOrFail({ id });
    return this.doctorsService.updateDoctor(id, data);
  }

  @Delete(':id')
  async deleteDoctor(@Param('id') id: string) {
    await this.doctorsService.getDoctorOrFail({ id });
    return this.doctorsService.deleteDoctor(id);
  }
}

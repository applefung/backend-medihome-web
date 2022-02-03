import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClinicsService } from './clinic.service';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  getClinics() {
    return this.clinicsService.getClinics();
  }

  @Get(':id')
  getClinic(@Param('id') id: string) {
    return this.clinicsService.getClinic({ id });
  }

  @Post()
  createClinic(@Body() data: any) {
    return this.clinicsService.createClinic(data);
  }

  @Patch(':id')
  async updateClinic(@Param('id') id: string, @Body() data: any) {
    await this.clinicsService.getClinicOrFail({ id });
    return this.clinicsService.updateClinic(id, data);
  }

  @Delete(':id')
  async deleteClinic(@Param('id') id: string) {
    await this.clinicsService.getClinicOrFail({ id });
    return this.clinicsService.deleteClinic(id);
  }
}

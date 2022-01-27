import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSpecialtyDto } from './dtos/create-specialty.dto';
import { UpdateSpecialtyDto } from './dtos/update-specialty.dto';
import { SpecialtiesService } from './specialties.service';

@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Get()
  getSpecialties() {
    return this.specialtiesService.getSpecialties();
  }

  @Get(':id')
  getSpecialty(@Param('id') id: string) {
    return this.specialtiesService.getSpecialty({ id });
  }

  @Post()
  createSpecialty(@Body() data: CreateSpecialtyDto) {
    return this.specialtiesService.createSpecialty(data);
  }

  @Patch(':id')
  async updateSpecialty(
    @Param('id') id: string,
    @Body() data: UpdateSpecialtyDto,
  ) {
    await this.specialtiesService.getSpecialtyOrFail({ id });
    return this.specialtiesService.updateSpecialty(id, data);
  }

  @Delete(':id')
  async deleteSpecialty(@Param('id') id: string) {
    await this.specialtiesService.getSpecialtyOrFail({ id });
    return this.specialtiesService.deleteSpecialty(id);
  }
}

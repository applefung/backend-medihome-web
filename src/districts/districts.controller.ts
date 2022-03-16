import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DistrictDto } from './dtos';
import { DistrictsService } from './districts.service';

@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Get()
  getDistricts() {
    return this.districtsService.getDistricts();
  }

  @Get(':id')
  getDistrict(@Param('id') id: string) {
    return this.districtsService.gettDistrict({ id });
  }

  @Post()
  createDistrict(@Body() data: DistrictDto) {
    return this.districtsService.createDistrict(data);
  }

  @Patch(':id')
  async updateDistrict(@Param('id') id: string, @Body() data: DistrictDto) {
    await this.districtsService.gettDistrictOrFail({ id });
    return this.districtsService.updatetDistrict(id, data);
  }

  @Delete(':id')
  async deleteDistrict(@Param('id') id: string) {
    await this.districtsService.gettDistrictOrFail({ id });
    return this.districtsService.deletetDistrict(id);
  }
}

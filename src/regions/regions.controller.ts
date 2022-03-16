import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RegionDto } from './dtos';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  getRegions() {
    return this.regionsService.getRegions();
  }

  @Get(':id')
  getRegion(@Param('id') id: string) {
    return this.regionsService.getRegion({ id });
  }

  @Post()
  createRegion(@Body() data: RegionDto) {
    return this.regionsService.createRegion(data);
  }

  @Patch(':id')
  async updateRegion(@Param('id') id: string, @Body() data: RegionDto) {
    await this.regionsService.getRegionOrFail({ id });
    return this.regionsService.updateRegion(id, data);
  }

  @Delete(':id')
  async deleteRegion(@Param('id') id: string) {
    await this.regionsService.getRegionOrFail({ id });
    return this.regionsService.deleteRegion(id);
  }
}

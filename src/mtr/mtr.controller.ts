import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MtrsService } from './mtr.service';
import { MtrDto } from './dtos';

@Controller('mtrs')
export class MtrsController {
  constructor(private readonly mtrsService: MtrsService) {}

  @Get()
  getMtrs() {
    return this.mtrsService.getMtrs();
  }

  @Get(':id')
  getMtr(@Param('id') id: string) {
    return this.mtrsService.getMtr({ id });
  }

  @Post()
  createMtr(@Body() data: MtrDto) {
    return this.mtrsService.createMtr(data);
  }

  @Patch(':id')
  async updateMtr(@Param('id') id: string, @Body() data: MtrDto) {
    await this.mtrsService.getMtrOrFail({ id });
    return this.mtrsService.updateMtr(id, data);
  }

  @Delete(':id')
  async deleteMtr(@Param('id') id: string) {
    await this.mtrsService.getMtrOrFail({ id });
    return this.mtrsService.deleteMtr(id);
  }
}

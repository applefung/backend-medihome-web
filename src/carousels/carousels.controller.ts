import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CarouselsService } from './carousels.service';
import { CreateCarouselDto, UpdateCarouselDto } from './dtos';

@Controller('carousels')
export class CarouselsController {
  constructor(private readonly carouselsService: CarouselsService) {}

  @Get()
  getCarousels() {
    return this.carouselsService.getCarousels();
  }

  @Get(':id')
  getCarousel(@Param('id') id: string) {
    return this.carouselsService.getCarousel({id});
  }

  @Post()
  createCarousel(@Body() data: CreateCarouselDto) {
    return this.carouselsService.createCarousel(data);
  }

  @Patch(':id')
  updateCarousel(@Param('id') id: string, @Body() data: UpdateCarouselDto) {
    return this.carouselsService.updateCarousel(id, data);
  }

  @Delete(':id')
  deleteCarousel(@Param('id') id: string) {
    return this.carouselsService.deleteCarousel(id);
  }
}

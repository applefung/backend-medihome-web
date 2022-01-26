import { Body, Controller, Get, Post } from '@nestjs/common';
import { CarouselsService } from './carousels.service';
import { CreateCarouselDto } from './dtos';

@Controller('carousels')
export class CarouselsController {
  constructor(private readonly carouselsService: CarouselsService) {}

  @Get()
  getCarousels(): string {
    return 'OK';
  }

  @Post()
  createCarousel(@Body() data: CreateCarouselDto) {
    return this.carouselsService.createCarousel(data);
  }
}

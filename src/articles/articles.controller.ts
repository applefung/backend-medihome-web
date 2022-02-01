import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getCarousels() {
    return this.articlesService.getCarousels();
  }

  @Get(':id')
  getCarousel(@Param('id') id: string) {
    return this.articlesService.getCarousel({ id });
  }

  @Post()
  createCarousel(@Body() data: any) {
    return this.articlesService.createCarousel(data);
  }

  @Patch(':id')
  async updateCarousel(@Param('id') id: string, @Body() data: any) {
    await this.articlesService.getCarouselOrFail({ id });
    return this.articlesService.updateCarousel(id, data);
  }

  @Delete(':id')
  async deleteCarousel(@Param('id') id: string) {
    await this.articlesService.getCarouselOrFail({ id });
    return this.articlesService.deleteCarousel(id);
  }
}

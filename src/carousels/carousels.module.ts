import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carousel } from '@src/entities';
import { CarouselsController } from './carousels.controller';
import { CarouselsService } from './carousels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel])],
  controllers: [CarouselsController],
  providers: [CarouselsService],
})
export class CarouselsModule {}

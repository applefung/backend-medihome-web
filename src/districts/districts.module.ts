import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from '@src/entities';
import { RegionsModule } from '@src/regions/regions.module';
import { DistrictsController } from './districts.controller';
import { DistrictsService } from './districts.service';

@Module({
  imports: [TypeOrmModule.forFeature([District]), RegionsModule],
  controllers: [DistrictsController],
  providers: [DistrictsService],
  exports: [DistrictsService],
})
export class DistrictsModule {}

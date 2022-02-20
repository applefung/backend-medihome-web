import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mtr } from '@src/entities';
import { MtrsController } from './mtr.controller';
import { MtrsService } from './mtr.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mtr])],
  controllers: [MtrsController],
  providers: [MtrsService],
})
export class MtrsModule {}

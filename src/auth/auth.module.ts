import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carousel } from '@src/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

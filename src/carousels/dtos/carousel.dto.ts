import { IsString } from 'class-validator';

export class CarouselDto {
  @IsString()
  url: string;
}

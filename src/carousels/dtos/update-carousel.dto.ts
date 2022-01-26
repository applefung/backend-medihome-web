import { IsString } from "class-validator";

export class UpdateCarouselDto {
    @IsString()
    url: string;
}
import { IsString } from "class-validator";


export class CreateCarouselDto {
    @IsString()
    url: string;
}
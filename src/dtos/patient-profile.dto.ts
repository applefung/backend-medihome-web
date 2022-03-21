import {
  HeightUnit,
  heightUnits,
  WeightUnit,
  weightUnits,
} from '@src/utils/patient-profile';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class WeightDto {
  @IsNumber()
  value: number;

  @IsString()
  @IsIn(weightUnits)
  unit: WeightUnit;
}

export class HeightDto {
  @IsNumber()
  value: number;

  @IsString()
  @IsIn(heightUnits)
  unit: HeightUnit;
}

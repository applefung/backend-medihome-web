import { HeightUnit, WeightUnit } from '@src/utils/patient-profile';

export interface Weight {
  value: number;
  unit: WeightUnit;
}

export interface Height {
  value: number;
  unit: HeightUnit;
}

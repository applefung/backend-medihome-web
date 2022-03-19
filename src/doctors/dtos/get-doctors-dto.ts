import {
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Order, orders } from '@src/utils/common';
import { DoctorField, doctorFields } from '@src/utils/doctor';

export class GetDoctorsDto {
  @IsOptional()
  @IsUUID()
  specialtyId: string;

  @IsOptional()
  @IsUUID()
  districtId: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  limit: string;

  @IsOptional()
  @IsString()
  @IsIn(orders)
  order: Order;

  @IsOptional()
  @IsString()
  @IsIn(doctorFields)
  orderBy: DoctorField;
}

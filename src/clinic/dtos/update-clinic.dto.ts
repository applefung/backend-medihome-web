import {
  BilingualDto,
  BusinessHoursDto,
  ContactsDto,
  MtrDto,
  ReservationTimeDto,
} from '@src/dtos';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateClinicDto {
  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  name: BilingualDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  address: BilingualDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => MtrDto)
  mtr: MtrDto;

  @IsOptional()
  @IsString()
  fee: string;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => ContactsDto)
  contacts: ContactsDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => BusinessHoursDto)
  businessHours: BusinessHoursDto;

  @IsOptional()
  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => ReservationTimeDto)
  reservationTime: ReservationTimeDto[];
}

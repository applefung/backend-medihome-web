import {
  AddressDto,
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
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateClinicDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  name: BilingualDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => MtrDto)
  mtr: MtrDto;

  @IsOptional()
  @IsString()
  fee: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ContactsDto)
  contacts: ContactsDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => BusinessHoursDto)
  businessHours: BusinessHoursDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => ReservationTimeDto)
  reservationTime: ReservationTimeDto[];

  @IsUUID()
  districtId: string;
}

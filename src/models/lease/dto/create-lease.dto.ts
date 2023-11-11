import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateLeaseDto {
  @IsNotEmpty()
  tenant: string;

  @IsNotEmpty()
  property: string;

  @IsNotEmpty()
  @IsDateString()
  lease_start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  lease_end_date: Date;

  @IsNotEmpty()
  @IsString()
  rent_plan: string;

  @IsNotEmpty()
  @IsNumber()
  security_deposit: number;

  @IsString()
  lease_terms: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}

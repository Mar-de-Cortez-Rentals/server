import { IsString } from 'class-validator';

export class GetAllLeasesDto {
  @IsString()
  tenant_name: string;

  @IsString()
  property_name: string;

  @IsString()
  lease_start_date: Array<Date>;
}

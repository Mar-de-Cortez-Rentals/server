import { IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  type: string;

  rents: Rent[];
}

class Rent {
  type: string;
  ammount: number;
}

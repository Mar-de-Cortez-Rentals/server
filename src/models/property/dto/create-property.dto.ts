export class CreatePropertyDto {
  name: string;
  address: string;
  type: string;
  rents: Rent[];
}

class Rent {
  type: string;
  ammount: number;
}

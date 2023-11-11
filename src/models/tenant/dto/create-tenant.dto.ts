class Contact_info {
  phone: string;
  email: string;
  job: string;
  job_address: string;
  job_phone: string;
}

export class CreateTenantDto {
  first_name: string;
  last_name: string;
  move_in_date: Date;
  contact_info: Contact_info;
}

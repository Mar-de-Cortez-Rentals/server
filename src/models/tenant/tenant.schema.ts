import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Lease } from '../lease/lease.schema';

export type TenantDocument = HydratedDocument<Tenant>;

class ContactInfo {
  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  job: string;

  @Prop()
  job_address: string;

  @Prop()
  job_phone: string;
}

@Schema()
export class Tenant {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  contact_info: ContactInfo;

  @Prop()
  move_in_date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lease' })
  leases: Lease[];
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);

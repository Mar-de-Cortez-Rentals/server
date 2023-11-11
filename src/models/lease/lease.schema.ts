import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Property } from '../property/property.entity';
import { Tenant } from 'src/models/tenant/tenant.schema';

export type LeaseDocument = HydratedDocument<Lease>;

@Schema()
export class Lease {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tenant' })
  tenant: Tenant;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Property',
  })
  property: Property;

  @Prop({ type: Date, required: true })
  lease_start_date: Date;

  @Prop({ type: Date, required: true })
  lease_end_date: Date;

  @Prop({ type: String, required: true })
  rent_plan: string;

  @Prop({ type: Number, required: true })
  security_deposit: number;

  @Prop({ required: true })
  lease_terms: string;

  @Prop({ required: true })
  status: string;
}

export const LeaseSchema = SchemaFactory.createForClass(Lease);

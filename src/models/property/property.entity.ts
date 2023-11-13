import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tenant } from '../tenant/tenant.schema';

export type PropertyDocument = Property & Document;

class Rent {
  @Prop({ type: Types.ObjectId, ref: Tenant.name })
  tenant: Tenant;

  @Prop({ type: Date })
  start_date: Date;

  @Prop({ type: Date })
  end_date: Date;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: Boolean })
  paid: boolean;
}

@Schema()
export class Property {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Rent' }] })
  rents: Rent[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);

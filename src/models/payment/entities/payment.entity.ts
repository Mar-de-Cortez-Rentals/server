import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Property } from 'src/models/property/property.entity';
import { Tenant } from 'src/models/tenant/tenant.schema';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ type: Property, required: true })
  property: Property;

  @Prop({ type: Tenant, required: true })
  tenant: Tenant;

  @Prop({ type: String, required: true })
  payment_method: string;

  @Prop({ type: Date, required: true })
  payment_date: Date;

  @Prop({ type: Number, required: true })
  amount_paid: number;

  @Prop({ type: String, required: true })
  received_by: string;

  @Prop({ type: String, required: true })
  delivered_by: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

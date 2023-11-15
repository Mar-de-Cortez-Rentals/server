import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NotificationsDocument = Notifications & Document;

@Schema()
export class Notifications {
  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  tenant_name: string;

  @Prop({ required: true })
  property_name: string;

  @Prop({ required: true })
  property_address: string;

  @Prop({ required: true })
  cash_amount: number;
}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications);

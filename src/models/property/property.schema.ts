import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PropertyDocument = Property & Document;

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

  @Prop([
    {
      type: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ])
  rents: {
    type: string;
    amount: number;
  }[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);

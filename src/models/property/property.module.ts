import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaseSchema } from '../lease/lease.schema';
import { PropertyController } from './property.controller';
import { PropertySchema } from './property.entity';
import { PropertyService } from './property.service';
import { PropertyUtils } from './utils/property.utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Property', schema: PropertySchema }]),
    MongooseModule.forFeature([{ name: 'Lease', schema: LeaseSchema }]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyUtils],
})
export class PropertyModule {}

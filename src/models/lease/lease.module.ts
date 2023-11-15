import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchema } from '../tenant/tenant.schema';
import { LeaseController } from './lease.controller';
import { LeaseSchema } from './lease.schema';
import { LeaseService } from './lease.service';
import { LeaseUtils } from './utils/lease.utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lease', schema: LeaseSchema }]),
    MongooseModule.forFeature([{ name: 'Tenant', schema: TenantSchema }]),
    MongooseModule.forFeature([{ name: 'Property', schema: LeaseSchema }]),
  ],
  controllers: [LeaseController],
  providers: [LeaseService, LeaseUtils],
})
export class LeaseModule {}

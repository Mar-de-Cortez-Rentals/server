import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantController } from './tenant.controller';
import { TenantSchema } from './tenant.schema';
import { TenantService } from './tenant.service';
import { TenantUtils } from './utils/tenant.utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tenant', schema: TenantSchema }]),
  ],

  controllers: [TenantController],
  providers: [TenantService, TenantUtils],
})
export class TenantModule {}

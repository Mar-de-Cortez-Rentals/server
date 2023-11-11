import { Module } from '@nestjs/common';
import { LeaseService } from './lease.service';
import { LeaseController } from './lease.controller';
import { LeaseSchema } from './lease.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lease', schema: LeaseSchema }]),
  ],
  controllers: [LeaseController],
  providers: [LeaseService],
})
export class LeaseModule {}

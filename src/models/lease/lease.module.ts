import { Module } from '@nestjs/common';
import { LeaseService } from './lease.service';
import { LeaseController } from './lease.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lease } from './entities/lease.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lease])],
  controllers: [LeaseController],
  providers: [LeaseService],
})
export class LeaseModule {}

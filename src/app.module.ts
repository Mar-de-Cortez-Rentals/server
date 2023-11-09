import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './models/tenant/tenant.module';
import { PropertyModule } from './models/property/property.module';
import { PaymentModule } from './models/payment/payment.module';
import { LeaseModule } from './models/lease/lease.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TenantModule,
    PropertyModule,
    PaymentModule,
    LeaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

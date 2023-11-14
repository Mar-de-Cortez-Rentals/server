import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaseModule } from './models/lease/lease.module';
import { PaymentModule } from './models/payment/payment.module';
import { PropertyModule } from './models/property/property.module';
import { TenantModule } from './models/tenant/tenant.module';
import { TestingModule } from '@nestjs/testing';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
    }),
    LeaseModule,
    TenantModule,
    PropertyModule,
    PaymentModule,
    TestingModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}

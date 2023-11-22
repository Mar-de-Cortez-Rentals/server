import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaseModule } from './models/lease/lease.module';
import { NotifcationsModule } from './models/notifcations/notifcations.module';
import { PaymentModule } from './models/payment/payment.module';
import { PropertyModule } from './models/property/property.module';
import { TenantModule } from './models/tenant/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: 'mongodb://root:example@mongodb:27017',
      }),
    }),
    LeaseModule,
    TenantModule,
    PropertyModule,
    PaymentModule,
    NotifcationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}

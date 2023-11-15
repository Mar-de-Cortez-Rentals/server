import { Module } from '@nestjs/common';
import { NotifcationsController } from './notifcations.controller';
import { NotifcationsService } from './notifcations.service';

@Module({
  controllers: [NotifcationsController],
  providers: [NotifcationsService]
})
export class NotifcationsModule {}

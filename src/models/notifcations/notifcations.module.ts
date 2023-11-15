import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifcationsController } from './notifcations.controller';
import { NotifcationsService } from './notifcations.service';
import { NotificationsSchema } from './notifications.schema';
import { NotificationsGateway } from './utils/notifications.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Notifcation', schema: NotificationsSchema },
    ]),
  ],
  controllers: [NotifcationsController],
  providers: [NotifcationsService, NotificationsGateway],
})
export class NotifcationsModule {}

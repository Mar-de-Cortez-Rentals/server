import { Test, TestingModule } from '@nestjs/testing';
import { NotifcationsController } from './notifcations.controller';

describe('NotifcationsController', () => {
  let controller: NotifcationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifcationsController],
    }).compile();

    controller = module.get<NotifcationsController>(NotifcationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

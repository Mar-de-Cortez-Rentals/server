import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get mongodbUri(): string {
    return this.configService.get<string>('MONGODB_URI');
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
}

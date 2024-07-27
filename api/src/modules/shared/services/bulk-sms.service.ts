import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Client, SendMessageResponse } from 'africastalking-ts';

@Injectable()
export class BulkSmsService {
  constructor(private configService: ConfigService) {}

  async send(to: string[], content: string): Promise<SendMessageResponse> {
    const AfricasTalking = new Client({
      apiKey: this.configService.get('AFRICASTALKING_API_KEY'),
      username: this.configService.get('AFRICASTALKING_USERNAME'),
    });

    try {
      const res = await AfricasTalking.sendSms({
        to: to.join(','),
        message: content,
        // from: credentials.username
      });
      console.log('sms sent res >>', res);
      return res;
    } catch (e) {
      console.log('err sending sms >>', e);
    }
  }
}

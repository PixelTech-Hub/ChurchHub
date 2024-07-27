import { Global, Module } from '@nestjs/common';
import { OtpService } from './services/otp.service';
import { MailerService } from './services/mailer.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    MailerService,
    OtpService
  ],
  exports: [
    MailerService, 
    OtpService
  ],
})
export class SharedModule { }

import { Injectable } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { LoginDto } from 'src/common/dto/login.dto';

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}

  async sendChurchAdminLoginOtp(
    dto: LoginDto,
    churchName: String,
    otp: Number,
    adminName: String
  ) {
    try {
      return await this.mailer.send(
        [dto.email],
        'OTP Verification',
        await this.mailer.loadContent('otp', {
          adminName,
          to: dto.email,
          from: churchName,
          email: dto.email,
          otp
        }),
      );
    } catch (e) {
      console.log(e);
    }
  }

  async verifyAdminEmail(adminEmail: string, verificationLink: String, adminName: String, churchName: String) {
    try {
      const subject = 'Email Verification';
      const content = await this.mailer.loadContent('admin-email-verification', {
        adminName,
        churchName,
        verificationLink
      });

      return await this.mailer.send([adminEmail], subject, content);
    } catch (e) {
      console.log('Error sending admin email verification:', e);
      throw e;
    }
  }
}
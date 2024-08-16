import { Injectable } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { LoginDto } from 'src/common/dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailer: MailerService,
    private configService: ConfigService,
  ) { }

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
          name: adminName,
          to: { name: adminName, email: dto.email },
          from: churchName,
          email: dto.email,
          otp
        }),
      );
    } catch (e) {
      console.log(e);
    }
  }

  async sendPasswordResetLink(
    email: string,
    resetToken: String,
    adminName: String,
    churchName: String
  ) {
    try {
      const resetLink = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`;
      console.log('Debug - Sending reset email with:', { adminName, email, resetLink });
      return await this.mailer.send(
        [email],
        'Password Reset',
        await this.mailer.loadContent('password-reset', {
          name: adminName,
          to: { name: adminName, email: email },
          from: churchName,
          email: email,
          resetLink: resetLink
        }),
      );
    } catch (e) {
      console.log('Error sending password reset email:', e);
      throw e;
    }
  }
}
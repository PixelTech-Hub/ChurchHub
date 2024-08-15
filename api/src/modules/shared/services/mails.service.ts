import { Injectable } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { CreateChurchAdminDto } from 'src/modules/admins/dto/create-churchadmin.dto';
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
    return await this.mailer.send(
      [dto.email],
      'OTP Verfication',
      await this.mailer.loadContent('otp', {
		adminName,
        to: dto.email,
        from: churchName,
        email: dto.email,
		otp
      }),
    );
  }

  catch(e) {
    console.log(e);
  }
}
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { ExceptionEnum } from '../../../common/enums/exception.enum';

import * as fs from 'fs';
import handlebars from 'handlebars';
import { BulkSmsService } from './bulk-sms.service';

@Injectable()
export class OtpService {
  constructor(
    private bulkSms: BulkSmsService,
    private readonly i18n: I18nService,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  generate(): { otpExpiresAt: Date; otp: number } {
    const otpExpiresAt = new Date(
      Date.now() + this.configService.get('OTP_VALIDITY_DURATION') * 60000,
    );
    const otp = Math.floor(Math.random() * 90000) + 10000;
    return { otp, otpExpiresAt };
  }

  verify(user: { otp?: number; otpExpiresAt?: Date }, otp: number): boolean {
    if (user.otp === null || user.otp !== otp)
      throw new NotAcceptableException(ExceptionEnum.otpIncorrect);

    const currentTime = new Date();
    const expirationTime = new Date(user.otpExpiresAt);
    if (currentTime > expirationTime)
      throw new NotAcceptableException(ExceptionEnum.otpExpired);
    return true;
  }

  async sendToEmail(
    otp: number,
    to: {
      name?: string;
      email?: string;
    },
  ): Promise<boolean> {
    console.log(`Attempting to send OTP ${otp} to ${to.email}`);
    const currentLanguage = undefined;
    const data = fs.readFileSync('src/resources/templates/email/otp.hbs');
    const template = handlebars.compile(data.toString());
    try {
      const subject = await this.i18n.t('mails.otp.appOtp', { lang: currentLanguage });
      const dearX = !to.name
        ? await this.i18n.t('mails.otp.hiThere', { lang: currentLanguage })
        : await this.i18n.t('mails.otp.dearX', { args: { name: `${to.name}` }, lang: currentLanguage });
      const yourOtpIsX = await this.i18n.t('mails.otp.yourOtpIsX', { args: { otp }, lang: currentLanguage });
      const bestRegards = await this.i18n.t('mails.otp.bestRegards', { lang: currentLanguage });
      const contactUsText = await this.i18n.t('mails.otp.contactUsText', { lang: currentLanguage });

      const emailContent = template({
        otp,
        to,
        lang: {
          dearX,
          yourOtpIsX,
          bestRegards,
          contactUsText,
        },
      });

      console.log(`Email sent successfully: ${emailContent}`);

      return await this.mailerService.send(
        [to.email],
        subject,
        emailContent,
      );
    } catch (e) {
      console.warn('EMAIL FAILURE >>>>>>>>>', e);
      return false;
    }
  }
}

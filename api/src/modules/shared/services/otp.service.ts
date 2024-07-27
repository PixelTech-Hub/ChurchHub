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
  ) { }

  generate(): { otpExpiresAt: Date; otp: number } {
    const otpExpiresAt = new Date(
      Date.now() + this.configService.get('OTP_VALIDITY_DURATION') * 60000,
    );
    const otp = Math.floor(Math.random() * 90000) + 10000;
    return { otp, otpExpiresAt };
  }

  verify(user: { otp?: number; otpExpiresAt?: Date }, otp: number): boolean {
    // Verify Otp
    if (user.otp === null || user.otp !== otp)
      throw new NotAcceptableException(ExceptionEnum.otpIncorrect);

    // Verify expiration date
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
      //currentLanguage?: string,
    },
  ): Promise<boolean> {
    const currentLanguage = /*to.currentLanguage ||*/ undefined;
    const data = fs.readFileSync('src/resources/templates/email/otp.hbs');
    const template = await handlebars.compile(data.toString());
    try {
      return await this.mailerService.send(
        [to.email],
        await this.i18n.t('mails.otp.appOtp', { lang: currentLanguage }),
        template({
          otp,
          to,
          lang: {
            dearX: !to.name
              ? await this.i18n.t('mails.otp.hiThere', {
                lang: currentLanguage,
              })
              : await this.i18n.t('mails.otp.dearX', {
                args: { name: `${to.name}`, lang: currentLanguage },
              }),
            yourOtpIsX: await this.i18n.t('mails.otp.yourOtpIsX', {
              args: { otp },
              lang: currentLanguage,
            }),
            bestRegards: await this.i18n.t('mails.otp.bestRegards', {
              lang: currentLanguage,
            }),
            contactUsText: await this.i18n.t('mails.otp.contactUsText', {
              lang: currentLanguage,
            }),
          },
        }),
      );
    } catch (e) {
      console.warn('EMAIL FAILURE >>>>>>>>>', e);
    }

    return false;
  }
}

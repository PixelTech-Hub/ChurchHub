import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer = require('nodemailer');

@Injectable()
export class MailerService {
  constructor(private configService: ConfigService) {}

  transporter = null;

  async loadContent(name: string, parameters: any) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const fs = require('fs');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const handlebars = require('handlebars');
      const data = fs.readFileSync(`src/views/mails/${name}.hbs`);
      const template = await handlebars.compile(data.toString());
      return template(parameters);
    } catch (e) {
      console.warn(e);
    }
    return '';
  }

  async send(to: [string], subject, content) {
    // -- define reusable transporter
    const isSecure: boolean = this.configService.get('EMAIL_SECURE');
    if (this.transporter === null) {
      this.transporter = nodemailer.createTransport({
        host: this.configService.get('EMAIL_HOST'),
        port: isSecure
          ? this.configService.get('EMAIL_PORT_FOR_SECURE')
          : this.configService.get('EMAIL_PORT_FOR_NOT_SECURE'),
        secure: isSecure,
        auth: {
          user: this.configService.get('EMAIL_AUTH_USER'), // generated ethereal user
          pass: this.configService.get('EMAIL_AUTH_PASSWORD'), // generated ethereal password
        },
      });
    }

    // -- send the mail
    return await this.transporter.sendMail({
      from:
        this.configService.get('EMAIL_FROM_NAME') +
        ' <' +
        this.configService.get('EMAIL_FROM_EMAIL') +
        '>', // sender address
      to: to.join(','), // list of receivers
      subject: subject, // Subject line
      text: content.replace(/<[^>]+>/g, ''), // plain text body
      html: content, // html body
    });
  }

  async sendOTPByEmail(email: string, otp: number) {
    const subject = 'OTP Verification';
    const content = `Your one-time verification passcode is: ${otp}`;

    await this.send([email], subject, content);
  }
}
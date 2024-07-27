import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import handlebars from 'handlebars';
import fs from 'fs';
import nodemailer = require('nodemailer');

@Injectable()
export class MailerService {
  constructor(private configService: ConfigService) {}

  transporter = null;

  async loadContent(name: string, parameters: object): Promise<string> {
    try {
      const data = fs.readFileSync(`src/views/mails/${name}.hbs`);
      const [template] = await Promise.all([
        handlebars.compile(data.toString()),
      ]);
      return template(parameters);
    } catch (e) {
      console.warn(e);
    }

    return '';
  }

  async send(
    to: string[],
    subject?: string,
    content?: string,
  ): Promise<boolean> {
    // Generate test SMTP service account from ethereal.email
    // create reusable transporter object using the default SMTP transport
    const isSecure: boolean = this.configService.get('EMAIL_SECURE');
    const config = {
      host: this.configService.get('EMAIL_HOST'),
      port: isSecure
        ? this.configService.get('EMAIL_PORT_FOR_SECURE')
        : this.configService.get('EMAIL_PORT_FOR_NOT_SECURE'),
      secure: isSecure,
      //requireTLS: isSecure,
      //ignoreTLS: !isSecure,
      auth: {
        user: this.configService.get('EMAIL_AUTH_USER'), // generated ethereal user
        pass: this.configService.get('EMAIL_AUTH_PASSWORD'), // generated ethereal password
      },
      /*...(isSecure && {
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      })*/
    };
    if (this.transporter === null) {
      this.transporter = nodemailer.createTransport(config);
    }

    console.log('sending Mail -->>');
    try {
      await this.transporter.sendMail({
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
      return true;
    } catch (e) {
      console.warn(e);
    }

    // send mail with defined transport object
    return false;
  }
}

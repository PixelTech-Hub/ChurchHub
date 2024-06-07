import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CONFIG_APP_DESCRIPTION, CONFIG_APP_NAME, CONFIG_APP_VERSION, CONFIG_DEV_EMAIL, CONFIG_DEV_NAME, CONFIG_DEV_URL } from './config/app.config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ExceptionEnum } from './common/enums/exception.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // -- Cors setup
  app.enableCors({
    origin: true, // Specify the allowed origins.  I'm setting false to allow requests from any origin
    // Find more configuration options here: https://github.com/expressjs/cors#configuration-options
  });


  // -- Helmet
  app.use(helmet());

  // -- Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // SWAGGER SETUP
  const config = new DocumentBuilder()
    .setTitle(CONFIG_APP_NAME)
    .setDescription(CONFIG_APP_DESCRIPTION)
    .setVersion(CONFIG_APP_VERSION)
    .setContact(CONFIG_DEV_NAME, CONFIG_DEV_URL, CONFIG_DEV_EMAIL) //Contact Us
    .addBearerAuth()
    .addBasicAuth({ type: 'apiKey', name: 'accessToken', in: 'query' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(8000);
}
bootstrap();
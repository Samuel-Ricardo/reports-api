import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'html'));
  app.setViewEngine('hbs');

  const docConfig = new DocumentBuilder()
    .setTitle('Reports API')
    .setDescription('The Reports API implements Server Sent Events')
    .setVersion('1.0')
    .addTag('reports')
    .setContact(
      'Samuel',
      'https://www.linkedin.com/in/samuel-ricardo/',
      'samuelricardoofficial@gmail.com',
    )
    .setLicense(
      'MIT',
      'https://github.com/Samuel-Ricardo/reports-api/blob/main/LICENSE',
    )
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.static("."));
  const config = new DocumentBuilder().setTitle('Swagger Api Movie').addBearerAuth().setDescription('Api Movie Cùng Cấp Dữ Liệu Cho Movie Web').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, { customCss: '.parameters-col_description .renderedMarkdown p {margin: 0px !important;} .opblock-description-wrapper p{font-size: 18px !important;}' });
  await app.listen(8080);
}
bootstrap();

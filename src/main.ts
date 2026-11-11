import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("Taskproject")
  .setDescription("Api de gestion de project")
  .setVersion("1.0")
  .addBasicAuth( {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    },
    'JWT-auth',)
  .build()

  const documentFactory = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Posts')
    .setDescription('CRUD API')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    Logger.log(`Application started on http://localhost:${port}.`, 'Main');
    Logger.log(
      `Swagger documentation on http://localhost:${port}/api-doc.`,
      'Main',
    );
    Logger.log(
      `Graphql playground on http://localhost:${port}/graphql.`,
      'Main',
    );
  });
}
bootstrap();

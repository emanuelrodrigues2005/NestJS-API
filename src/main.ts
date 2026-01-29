import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Treinamento Nest JS Seed a Bit')
    .setDescription('API usando NestJS e Swagger')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(`🚀 Aplicação rodando em: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Swagger disponível em: http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();

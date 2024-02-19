import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,

      exceptionFactory: (errors: ValidationError[]) => {
        if (errors && errors.length > 0) {
          const children = errors[0].children;
          if (children && children.length !== 0) {
            const error = children[0].constraints;
            const keys = Object.keys(error);
            const type = keys[keys.length - 1];
            const message = error[type];
            return new BadRequestException(message);
          }
          const error = errors[0].constraints;
          const keys = Object.keys(error);
          const type = keys[keys.length - 1];
          const message = error[type];
          return new BadRequestException(message);
        }
      },
    })
  );

  const document = SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('로그인 API').addCookieAuth().addServer('http://localhost:3000').build(), {});

  SwaggerModule.setup('/document', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(3000);
}
bootstrap();

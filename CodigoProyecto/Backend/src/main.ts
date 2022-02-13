import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    const config = new DocumentBuilder()
        .setTitle('Qrlean')
        .setDescription('Qrlean')
        .setVersion('1.0')
        .addTag('Qrlean')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
    });
    await app.listen(process.env.PORT || 3000);
}
bootstrap();

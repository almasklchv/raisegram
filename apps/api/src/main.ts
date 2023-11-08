import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS and specify allowed origins
  app.enableCors({
    origin: 'https://raisegram-web-n66o.vercel.app', 
  });

  await app.listen(3333);
}

bootstrap();

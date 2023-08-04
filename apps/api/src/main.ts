import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // // Enable CORS
  app.enableCors({
    origin: ['https://raisegram.ctw.re']
  });

  await app.listen(3333);
}
bootstrap();

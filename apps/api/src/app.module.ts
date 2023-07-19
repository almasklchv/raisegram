import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

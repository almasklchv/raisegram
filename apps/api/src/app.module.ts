import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [
   PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AiModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalSchema } from './animals/animal.schema';
import { AnimalService } from './animals/animal.service';
import { AnimalController } from './animals/animal.controller';
import { BidzinaController } from './bidzina/bidzina.controller';
import { MusicController } from './music/music.controller';
import { ConfigModule } from '@nestjs/config';
import { PigHappinessService } from './pigHappiness/pigHappiness.service';
import { PigHappinessSchema } from './pigHappiness/pigHappiness.schema';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CustomLogger } from './loggerService/logger.service';
import { HealthModule } from './health/health.module';
import { HttpModule } from '@nestjs/axios'; // Importi

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`, {
      maxPoolSize: 10,
    }),
    MongooseModule.forFeature([{ name: 'Animal', schema: AnimalSchema }]),
    MongooseModule.forFeature([
      { name: 'PigHappiness', schema: PigHappinessSchema },
    ]),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    CacheModule.register({
      store: redisStore,
      ttl: 60000,
    }),
    HealthModule,
    HttpModule,
  ],
  controllers: [AnimalController, BidzinaController, MusicController],
  providers: [AnimalService, PigHappinessService, CustomLogger],
})
export class AppModule {}

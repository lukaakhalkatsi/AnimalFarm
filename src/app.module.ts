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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    MongooseModule.forFeature([{ name: 'Animal', schema: AnimalSchema }]),
    MongooseModule.forFeature([
      { name: 'PigHappiness', schema: PigHappinessSchema },
    ]),
  ],
  controllers: [AnimalController, BidzinaController, MusicController],
  providers: [AnimalService, PigHappinessService],
})
export class AppModule {}

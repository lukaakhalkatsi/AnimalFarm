import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalSchema } from './animals/animal.schema';
import { AnimalService } from './animals/animal.service';
import { AnimalController } from './animals/animal.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    MongooseModule.forFeature([{ name: 'Animal', schema: AnimalSchema }]),
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AppModule {}

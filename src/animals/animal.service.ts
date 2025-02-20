import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './animal.schema';
import { PigHappinessService } from '../pigHappiness/pigHappiness.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CustomLogger } from 'src/loggerService/logger.service';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel('Animal') private readonly animalModel: Model<Animal>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly pigHappinessService: PigHappinessService,
    private readonly logger: CustomLogger,
  ) {}

  async addAnimal(animal: Partial<Animal>): Promise<Animal> {
    const newAnimal = new this.animalModel(animal);
    return newAnimal.save();
  }

  async getAnimals(): Promise<Animal[]> {
    if (!this.cacheManager) {
      this.logger.error('❌ CacheManager is not initialized!');
      return this.animalModel.find().exec();
    }

    try {
      const cachedAnimals = await this.cacheManager.get<Animal[]>('animals');

      if (cachedAnimals) {
        return cachedAnimals;
      }

      const animals = await this.animalModel.find().exec();

      await this.cacheManager.set('animals', animals);

      this.logger.log('✅ Animals fetched from database.');

      return animals;
    } catch (error) {
      this.logger.error('🔥 Error accessing cache:' + error);
      return this.animalModel.find().exec();
    }
  }

  async feedAnimal(
    id: string,
  ): Promise<{ id: string; feedNumber: number; happy: string }> {
    const animal = await this.animalModel.findOne({ id });

    if (!animal) {
      throw new NotFoundException(`Animal with id ${id} not found`);
    }

    animal.feedNumber += 1;
    await animal.save();

    const happyMessage = await this.pigHappinessService.getHappyMessage();

    return {
      id: animal.id,
      feedNumber: animal.feedNumber,
      happy: happyMessage,
    };
  }
}

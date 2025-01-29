import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './animal.schema';
import { PigHappinessService } from '../pigHappiness/pigHappiness.service';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel('Animal') private readonly animalModel: Model<Animal>,
    private readonly pigHappinessService: PigHappinessService,
  ) {}

  async addAnimal(animal: Partial<Animal>): Promise<Animal> {
    const newAnimal = new this.animalModel(animal);
    return newAnimal.save();
  }

  async getAnimals(): Promise<Animal[]> {
    return this.animalModel.find().exec();
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

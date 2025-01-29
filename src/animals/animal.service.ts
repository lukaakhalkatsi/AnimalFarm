import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './animal.schema';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel('Animal') private readonly animalModel: Model<Animal>,
  ) {}

  async addAnimal(animal: Partial<Animal>): Promise<Animal> {
    const newAnimal = new this.animalModel(animal);
    return newAnimal.save();
  }

  async getAnimals(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }

  async feedAnimal(id: string): Promise<Animal> {
    const animal = await this.animalModel.findOne({ id });

    if (!animal) {
      throw new NotFoundException(`Animal with id ${id} not found`);
    }

    animal.feedNumber += 1;
    return animal.save();
  }
}

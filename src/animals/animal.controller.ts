import { Controller, Get, Post, Body } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { Animal } from './animal.schema';

@Controller('api/animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  async addAnimal(@Body() animal: Partial<Animal>): Promise<Animal> {
    return this.animalService.addAnimal(animal);
  }

  @Get()
  async getAnimals(): Promise<Animal[]> {
    return this.animalService.getAnimals();
  }
}

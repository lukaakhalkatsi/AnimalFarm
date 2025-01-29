import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { Animal } from './animal.schema';

@Controller('api/animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  async addAnimal(@Body() animal: Partial<Animal>): Promise<Animal> {
    return this.animalService.addAnimal(animal);
  }

  @Post(':id/feed')
  async feedAnimal(
    @Param('id') id: string,
  ): Promise<{ id: string; feedNumber: number; happy: string }> {
    const updatedAnimal = await this.animalService.feedAnimal(id);
    return {
      id: updatedAnimal.id,
      feedNumber: updatedAnimal.feedNumber,
      happy: updatedAnimal.happy,
    };
  }

  @Get()
  async getAnimals(): Promise<Animal[]> {
    return this.animalService.getAnimals();
  }
}

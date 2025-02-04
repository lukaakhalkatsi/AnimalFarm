import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { Animal } from './animal.schema';

@Controller('api/animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  async addAnimal(@Body() animal: Partial<Animal>): Promise<Animal> {
    try {
      if (!animal || Object.keys(animal).length === 0) {
        throw new BadRequestException('Animal data cannot be empty');
      }
      return await this.animalService.addAnimal(animal);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post(':id/feed')
  async feedAnimal(
    @Param('id') id: string,
  ): Promise<{ id: string; feedNumber: number; happy: string }> {
    try {
      const updatedAnimal = await this.animalService.feedAnimal(id);
      if (!updatedAnimal) {
        throw new NotFoundException(`Animal with id ${id} not found`);
      }
      return {
        id: updatedAnimal.id,
        feedNumber: updatedAnimal.feedNumber,
        happy: updatedAnimal.happy,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async getAnimals(): Promise<Animal[]> {
    try {
      return await this.animalService.getAnimals();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve animals');
    }
  }
}

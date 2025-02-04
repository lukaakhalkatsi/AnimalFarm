import { Test, TestingModule } from '@nestjs/testing';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

const mockAnimalService = {
  addAnimal: jest.fn(),
  feedAnimal: jest.fn(),
  getAnimals: jest.fn(),
};

describe('AnimalController', () => {
  let controller: AnimalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalController],
      providers: [{ provide: AnimalService, useValue: mockAnimalService }],
    }).compile();

    controller = module.get<AnimalController>(AnimalController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addAnimal', () => {
    it('should add a new animal and return it', async () => {
      const animal = { name: 'Lion', species: 'Panthera leo' };
      const createdAnimal = { id: '1', ...animal };
      mockAnimalService.addAnimal.mockResolvedValue(createdAnimal);

      await expect(controller.addAnimal(animal)).resolves.toEqual(
        createdAnimal,
      );
    });

    it('should throw BadRequestException if animal data is empty', async () => {
      await expect(controller.addAnimal({})).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw InternalServerErrorException on service error', async () => {
      mockAnimalService.addAnimal.mockRejectedValue(new Error('Service error'));
      await expect(controller.addAnimal({ name: 'Elephant' })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('feedAnimal', () => {
    it('should return updated animal with feed count', async () => {
      const updatedAnimal = { id: '1', feedNumber: 3, happy: 'Very Happy' };
      mockAnimalService.feedAnimal.mockResolvedValue(updatedAnimal);

      await expect(controller.feedAnimal('1')).resolves.toEqual(updatedAnimal);
    });

    it('should throw NotFoundException if animal is not found', async () => {
      mockAnimalService.feedAnimal.mockResolvedValue(null);
      await expect(controller.feedAnimal('99')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException on service error', async () => {
      mockAnimalService.feedAnimal.mockRejectedValue(
        new Error('Database error'),
      );
      await expect(controller.feedAnimal('1')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getAnimals', () => {
    it('should return an array of animals', async () => {
      const animals = [
        { id: '1', name: 'Tiger' },
        { id: '2', name: 'Bear' },
      ];
      mockAnimalService.getAnimals.mockResolvedValue(animals);

      await expect(controller.getAnimals()).resolves.toEqual(animals);
    });

    it('should throw InternalServerErrorException on service error', async () => {
      mockAnimalService.getAnimals.mockRejectedValue(
        new Error('Database error'),
      );
      await expect(controller.getAnimals()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});

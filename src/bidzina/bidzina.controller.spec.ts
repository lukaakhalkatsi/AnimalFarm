import { Test, TestingModule } from '@nestjs/testing';
import { BidzinaController } from './bidzina.controller';
import { PigHappinessService } from '../pigHappiness/pigHappiness.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

const mockPigHappinessService = {
  getPigHappiness: jest.fn(),
};

describe('BidzinaController', () => {
  let controller: BidzinaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidzinaController],
      providers: [
        { provide: PigHappinessService, useValue: mockPigHappinessService },
      ],
    }).compile();

    controller = module.get<BidzinaController>(BidzinaController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBidzinaStatus', () => {
    it('should return pig happiness status', async () => {
      const happiness = { level: 'Happy', reason: 'Well-fed' };
      mockPigHappinessService.getPigHappiness.mockResolvedValue(happiness);

      await expect(controller.getBidzinaStatus()).resolves.toEqual(happiness);
    });

    it('should throw NotFoundException if pig happiness status is not found', async () => {
      mockPigHappinessService.getPigHappiness.mockResolvedValue(null);
      await expect(controller.getBidzinaStatus()).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException on service error', async () => {
      mockPigHappinessService.getPigHappiness.mockRejectedValue(
        new Error('Database error'),
      );
      await expect(controller.getBidzinaStatus()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});

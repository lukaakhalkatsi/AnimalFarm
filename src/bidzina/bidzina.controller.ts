import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PigHappinessService } from '../pigHappiness/pigHappiness.service';
import { CustomLogger } from 'src/loggerService/logger.service';

@Controller('api/bidzina')
export class BidzinaController {
  constructor(
    private readonly pigHappinessService: PigHappinessService,
    private readonly logger: CustomLogger,
  ) {}

  @Get('status')
  async getBidzinaStatus() {
    try {
      const happiness = await this.pigHappinessService.getPigHappiness();

      if (!happiness) {
        // ✅ Throw NotFoundException directly (outside try-catch)
        this.logger.error('Pig happiness status not found');
        throw new NotFoundException('Pig happiness status not found');
      }

      return happiness;
    } catch (error) {
      // ✅ Only catch unexpected errors
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException so it's not wrapped
      }

      throw new InternalServerErrorException(
        error.message || 'Failed to retrieve pig happiness status',
      );
    }
  }
}

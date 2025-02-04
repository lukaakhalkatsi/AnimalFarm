import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PigHappinessService } from '../pigHappiness/pigHappiness.service';

@Controller('api/bidzina')
export class BidzinaController {
  constructor(private readonly pigHappinessService: PigHappinessService) {}

  @Get('status')
  async getBidzinaStatus() {
    try {
      const happiness = await this.pigHappinessService.getPigHappiness();

      if (!happiness) {
        throw new NotFoundException('Pig happiness status not found');
      }

      return happiness;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve pig happiness status',
      );
    }
  }
}

import { Controller, Get } from '@nestjs/common';
import { PigHappinessService } from '../pigHappiness/pigHappiness.service';

@Controller('api/bidzina')
export class BidzinaController {
  constructor(private readonly pigHappinessService: PigHappinessService) {}

  @Get('status')
  async getBidzinaStatus() {
    const happiness = await this.pigHappinessService.getPigHappiness();

    if (!happiness) {
      return { status: 'Not found' };
    }

    return happiness;
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PigHappiness } from './pigHappiness.schema';
import { CustomLogger } from 'src/loggerService/logger.service';

@Injectable()
export class PigHappinessService {
  constructor(
    @InjectModel('PigHappiness')
    private readonly pigHappinessModel: Model<PigHappiness>,
    private readonly logger: CustomLogger,
  ) {}

  async getHappyMessage(): Promise<string> {
    try {
      const happinessDoc = await this.pigHappinessModel.findOne();
      return happinessDoc ? happinessDoc.happy : 'Unknown Property';
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error retrieving happy message');
    }
  }

  async getPigHappiness(): Promise<PigHappiness | null> {
    try {
      return await this.pigHappinessModel.findOne();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error fetching pigHappiness');
    }
  }
}

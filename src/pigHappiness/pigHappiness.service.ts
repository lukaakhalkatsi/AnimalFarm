import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PigHappiness } from './pigHappiness.schema';

@Injectable()
export class PigHappinessService {
  constructor(
    @InjectModel('PigHappiness')
    private readonly pigHappinessModel: Model<PigHappiness>,
  ) {}

  async getHappyMessage(): Promise<string> {
    const happinessDoc = await this.pigHappinessModel.findOne();
    return happinessDoc ? happinessDoc.happy : 'Unknown Happiness';
  }
}

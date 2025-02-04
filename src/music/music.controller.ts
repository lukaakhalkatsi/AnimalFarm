import { Controller, Post, Body, BadRequestException } from '@nestjs/common';

@Controller('api/music')
export class MusicController {
  @Post('toggle')
  toggleMusic(@Body() body: { message: string }) {
    try {
      if (!body || !body.message) {
        throw new BadRequestException('Message field is required');
      }

      if (body.message === 'putin') {
        return { audioUrl: '/audio/putin.mp3', message: 'Playing Putin Audio' };
      } else if (body.message === 'georgia') {
        return {
          audioUrl: '/audio/georgia.mp3',
          message: 'Playing Georgia Audio',
        };
      } else {
        throw new BadRequestException('Invalid message');
      }
    } catch (error) {
      throw error;
    }
  }
}

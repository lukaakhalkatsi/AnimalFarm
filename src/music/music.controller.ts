import { Controller, Post, Body } from '@nestjs/common';

@Controller('api/music')
export class MusicController {
  @Post('toggle')
  toggleMusic(@Body() body: { message: string }) {
    if (body.message === 'putin') {
      return { audioUrl: '/audio/putin.mp3', message: 'Playing Putin Audio' };
    } else if (body.message === 'georgia') {
      return {
        audioUrl: '/audio/georgia.mp3',
        message: 'Playing Georgia Audio',
      };
    } else {
      return { error: 'Invalid message' };
    }
  }
}

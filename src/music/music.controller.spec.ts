import { MusicController } from './music.controller';
import { BadRequestException } from '@nestjs/common';

describe('MusicController', () => {
  let controller: MusicController;

  beforeEach(() => {
    controller = new MusicController();
  });

  describe('toggleMusic', () => {
    it('should return Putin audio URL when message is "putin"', () => {
      const result = controller.toggleMusic({ message: 'putin' });

      expect(result).toEqual({
        audioUrl: '/audio/putin.mp3',
        message: 'Playing Putin Audio',
      });
    });

    it('should return Georgia audio URL when message is "georgia"', () => {
      const result = controller.toggleMusic({ message: 'georgia' });

      expect(result).toEqual({
        audioUrl: '/audio/georgia.mp3',
        message: 'Playing Georgia Audio',
      });
    });

    it('should throw BadRequestException if message is missing', () => {
      expect(() => controller.toggleMusic({ message: '' })).toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if body is empty', () => {
      expect(() => controller.toggleMusic({} as any)).toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for an invalid message', () => {
      expect(() => controller.toggleMusic({ message: 'random' })).toThrow(
        BadRequestException,
      );
    });
  });
});

import { Injectable } from '@nestjs/common';
import { ContentService } from 'src/content/content.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contentService: ContentService,
  ) {}

  async getOne(themeId: string, userId: string) {
    const contents = await this.contentService.findAll(themeId, userId, {
      hasLearned: false,
    });
  }
}

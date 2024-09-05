import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentService } from './content.service';
import { ValidateSelectedTranslation } from './dto/study.dto';
import {
  SelectTrueTranslation,
  Variations,
} from './entities/select-true-translation.enity';

@Injectable()
export class StudyService {
  constructor(
    private prisma: PrismaService,
    private contentService: ContentService,
  ) {}

  async validateSelectedTranslation(dto: ValidateSelectedTranslation) {
    const content = await this.contentService.findOne(
      dto.currentSentenceId,
      dto.themeId,
    );

    return dto.translation === content.translation;
  }

  async getForSelectTrueTranslation(
    themeId: string,
    userId: string,
    repeatedContentsId: Set<string[]>,
  ) {
    const contents = await this.prisma.content.findMany({
      where: {
        theme: {
          id: themeId,
          userId,
        },
        hasLearned: false,
      },
      select: {
        id: true,
        sentence: true,
        translation: true,
        themeId: true,
      },
    });

    let randomContent;

    do {
      if (repeatedContentsId.size === contents.length) {
        return this.emptyResponse(themeId);
      }
      randomContent = contents[this.generateRandomIndex(contents.length)];
    } while (repeatedContentsId.has(randomContent.id));

    repeatedContentsId.add(randomContent.id);
    const variations = await this.getRandomTranslations(
      randomContent.id,
      themeId,
      userId,
    );
    variations.push({ translation: randomContent.translation });

    const response: SelectTrueTranslation = {
      id: randomContent.id,
      itemsLeft: contents.length - repeatedContentsId.size,
      sentence: randomContent.sentence,
      themeId: randomContent.themeId,
      variations: this.shuffleArray(variations),
    };

    return response.itemsLeft === 0 ? this.emptyResponse(themeId) : response;
  }

  private async getRandomTranslations(
    exeptId: string,
    themeId: string,
    userId: string,
  ): Promise<Variations[]> {
    const contents = await this.prisma.content.findMany({
      where: {
        theme: {
          id: themeId,
          userId,
        },
        NOT: {
          id: exeptId,
        },
      },
      select: {
        translation: true,
        id: true,
      },
    });

    const uniqueTranslations = new Set<Variations>();
    while (uniqueTranslations.size < 2) {
      const randomIndex = this.generateRandomIndex(contents.length);
      uniqueTranslations.add(contents[randomIndex]);
    }

    return Array.from(uniqueTranslations).map(({ translation }) => ({
      translation,
    }));
  }

  private generateRandomIndex(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private emptyResponse(themeId: string): SelectTrueTranslation {
    return {
      id: '',
      itemsLeft: 0,
      sentence: '',
      themeId,
      variations: [],
    };
  }
}

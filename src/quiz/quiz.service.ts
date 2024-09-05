import { Injectable } from '@nestjs/common';
import { ContentService } from 'src/content/content.service';
import { Content } from 'src/content/entities/content.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizSession, Variations } from './entitys/quiz.entiti';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contentService: ContentService,
  ) {}

  async create(dto: CreateQuizDto, userId: string) {
    const quiz = await this.prisma.quiz.create({
      data: {
        correctAnswers: 0,
        correctCount: 0,
        repeatedSentences: [],
        theme: {
          connect: {
            id: dto.themeId,
            user: {
              id: userId,
            },
          },
        },
        type: dto.type,
        wrongCount: 0,
      },
    });

    return quiz;
  }

  async getVariations(themeId: string, userId: string): Promise<QuizSession> {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        themeId,
      },
    });

    const contents = await this.contentService.findAll(
      themeId,
      userId,
      {
        hasLearned: false,
      },
      {
        id: true,
        sentence: true,
        translation: true,
      },
    );

    let randomContent: Content;

    if (quiz.repeatedSentences.length === contents.length) {
      return this.emptyResponse(themeId);
    }
    randomContent = await contents[this.generateRandomIndex(contents.length)];

    await this.prisma.quiz.update({
      where: {
        themeId,
      },
      data: {
        repeatedSentences: [...quiz.repeatedSentences, randomContent.id],
      },
    });

    const variations = await this.getRandomTranslations(
      randomContent.id,
      themeId,
      userId,
    );
    variations.push({ translation: randomContent.translation });

    const response: QuizSession = {
      itemsLeft: contents.length - quiz.repeatedSentences.length,
      sentence: randomContent.sentence,
      themeId,
      variations: this.shuffleArray(variations),
    };

    return response.itemsLeft === 0 ? this.emptyResponse(themeId) : response;
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

  private async getRandomTranslations(
    exeptId: string,
    themeId: string,
    userId: string,
  ): Promise<Variations[]> {
    const contents = await this.contentService.findAll(
      themeId,
      userId,
      {
        NOT: {
          id: exeptId,
        },
      },
      {
        translation: true,
        id: true,
      },
    );

    const uniqueTranslations = new Set<Variations>();
    while (uniqueTranslations.size < 2) {
      uniqueTranslations.add(
        contents[this.generateRandomIndex(contents.length)],
      );
    }

    return Array.from(uniqueTranslations).map(({ translation }) => ({
      translation,
    }));
  }

  private emptyResponse(themeId: string): QuizSession {
    return {
      itemsLeft: 0,
      sentence: '',
      themeId,
      variations: [],
    };
  }
}

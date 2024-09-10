import { Injectable } from '@nestjs/common';
import { EnumStudyType, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { ContentService } from 'src/content/content.service';
import { Content } from 'src/content/entities/content.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateRandomIndex, shuffleArray } from 'src/utils/utils';
import { ValidateQuizDto } from './dto/validate-quiz.dto';
import {
  QuizSession,
  ValidationResult,
  Variations,
} from './entities/quiz.entiti';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contentService: ContentService,
  ) {}

  async findOne(
    userId: string,
    themeId: string,
    select?: Prisma.QuizSelect<DefaultArgs>,
  ) {
    const quiz = await this.prisma.quiz.findUnique({
      where: {
        themeId,
        theme: {
          userId,
        },
      },
      select,
    });

    if (!quiz) {
      throw new Error('quiz not found');
    }
    return quiz;
  }

  async create(type: EnumStudyType, userId: string, themeId: string) {
    await this.prisma.quiz.create({
      data: {
        correctAnswers: 0,
        correctCount: 0,
        repeatedSentences: [],
        theme: {
          connect: {
            id: themeId,
            user: {
              id: userId,
            },
          },
        },
        type: type,
        wrongCount: 0,
      },
    });
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
    randomContent = await contents[generateRandomIndex(contents.length)];

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
      contentId: randomContent.id,
      sentence: randomContent.sentence,
      themeId,
      variations: shuffleArray(variations),
    };

    return response.itemsLeft === 0 ? this.emptyResponse(themeId) : response;
  }

  async restart(themeId: string, userId: string) {
    return !!(await this.update(themeId, userId, {
      repeatedSentences: [],
      correctAnswers: 0,
      correctCount: 0,
      wrongCount: 0,
    }));
  }

  async getResult(themeId: string, userId: string) {
    const quiz = await this.findOne(userId, themeId, {
      correctAnswers: true,
    });

    return quiz;
  }

  async update(themeId: string, userId: string, data: Prisma.QuizUpdateInput) {
    const quiz = await this.findOne(userId, themeId);

    return await this.prisma.quiz.update({
      where: {
        themeId: quiz.themeId,
        theme: {
          user: {
            id: userId,
          },
        },
      },
      data,
    });
  }

  async validate(
    dto: ValidateQuizDto,
    userId: string,
  ): Promise<ValidationResult> {
    const quiz = await this.findOne(userId, dto.themeId);
    let response: ValidationResult;
    const currentContent = await this.contentService.findOne(
      dto.contentId,
      dto.themeId,
      {
        translation: true,
      },
    );

    if (dto.translation === currentContent.translation) {
      await this.update(dto.themeId, userId, {
        correctCount: quiz.correctCount + 1,
      });
    } else {
      await this.update(dto.themeId, userId, {
        wrongCount: quiz.wrongCount + 1,
      });
    }

    response = {
      isCorrect: dto.translation === currentContent.translation,
      correctTranslation: currentContent.translation,
      selectedTranslation: dto.translation,
    };

    return response;
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
      uniqueTranslations.add(contents[generateRandomIndex(contents.length)]);
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
      contentId: '',
    };
  }
}

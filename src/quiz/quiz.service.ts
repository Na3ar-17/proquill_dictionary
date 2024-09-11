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
        id: {
          notIn: quiz.repeatedSentences,
        },
      },
      {
        id: true,
        sentence: true,
        translation: true,
      },
    );

    const contentsLength = await this.prisma.content.count({
      where: {
        themeId,
        theme: {
          userId,
        },
      },
    });

    if (contents.length === 0) {
      return this.emptyResponse(themeId, contentsLength);
    }

    let randomContent: Content;

    if (quiz.repeatedSentences.length === contentsLength) {
      return this.emptyResponse(themeId, contentsLength);
    }

    randomContent = await contents[generateRandomIndex(contents.length)];

    const variations = await this.getRandomTranslations(
      randomContent.id,
      themeId,
      userId,
    );
    variations.push({ translation: randomContent.translation });

    const response: QuizSession = {
      itemsLeft: contentsLength - quiz.repeatedSentences.length,
      totalItems: contentsLength,
      contentId: randomContent.id,
      sentence: randomContent.sentence,
      themeId,
      variations: shuffleArray(variations),
    };

    return response.itemsLeft === 0
      ? this.emptyResponse(themeId, contentsLength)
      : response;
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
    const currentContent = await this.contentService.findOne(
      dto.contentId,
      dto.themeId,
      {
        translation: true,
      },
    );

    const isCorrect = dto.translation === currentContent.translation;

    if (isCorrect) {
      await this.update(dto.themeId, userId, {
        correctCount: quiz.correctCount + 1,
      });
    } else {
      await this.update(dto.themeId, userId, {
        wrongCount: quiz.wrongCount + 1,
      });
    }

    await this.update(dto.themeId, userId, {
      repeatedSentences: [...quiz.repeatedSentences, dto.contentId],
    });

    const totalAnswers = quiz.correctCount + quiz.wrongCount + 1;
    const correctPercentage =
      ((quiz.correctCount + (isCorrect ? 1 : 0)) / totalAnswers) * 100;
    await this.update(dto.themeId, userId, {
      correctAnswers: correctPercentage,
    });

    const response: ValidationResult = {
      isCorrect: dto.translation === currentContent.translation,
      correctTranslation: currentContent.translation,
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

  private emptyResponse(themeId: string, totalItems: number): QuizSession {
    return {
      itemsLeft: 0,
      sentence: '',
      themeId,
      variations: [],
      contentId: '',
      totalItems,
    };
  }
}

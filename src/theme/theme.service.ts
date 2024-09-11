import { Injectable } from '@nestjs/common';
import { LearningProgressService } from 'src/learning-progress/learning-progress.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizService } from 'src/quiz/quiz.service';
import { UpdateThemeDto } from './dto/update-theme.dto';

@Injectable()
export class ThemeService {
  constructor(
    private prisma: PrismaService,
    private learningProgressService: LearningProgressService,
    private quizService: QuizService,
  ) {}

  async create(userId: string) {
    const themes = await this.findAll(userId);

    const themeTitle =
      (await themes.length) > 0 ? `Untitled-${themes.length}` : 'Untitled';

    const newTheme = await this.prisma.theme.create({
      data: {
        title: themeTitle,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (newTheme.id) {
      await this.learningProgressService.create({
        themeId: newTheme.id,
        userId,
      });
      await this.quizService.create('Quiz', userId, newTheme.id);
    }

    return newTheme;
  }

  async findAll(userId: string) {
    const themes = await this.prisma.theme.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return themes;
  }

  async findOne(id: string, userId: string) {
    const theme = await this.prisma.theme.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        learningProgress: true,
      },
    });

    if (!theme) {
      throw new Error('Theme not found');
    }

    return theme;
  }

  async update(updateThemeDto: UpdateThemeDto, userId: string) {
    const theme = await this.findOne(updateThemeDto.id, userId);

    const updated = await this.prisma.theme.update({
      where: {
        id: updateThemeDto.id,
        userId: userId,
      },
      data: {
        title: updateThemeDto.title || theme.title,
      },
    });

    return updated;
  }

  async delete(ids: string[], userId: string) {
    const deleted = await this.prisma.theme.deleteMany({
      where: {
        userId,
        id: {
          in: ids,
        },
      },
    });

    return deleted.count;
  }
}

import { Injectable } from '@nestjs/common';
import { UpdateThemeInput } from './dto/update-theme.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { LearningProgressService } from 'src/learning-progress/learning-progress.service';

@Injectable()
export class ThemeService {
  constructor(
    private prisma: PrismaService,
    private learningProgressService: LearningProgressService,
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
    }

    return newTheme;
  }

  async findAll(userId: string) {
    const themes = await this.prisma.theme.findMany({
      where: {
        userId,
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

  async update(updateThemeInput: UpdateThemeInput, userId: string) {
    const theme = await this.findOne(updateThemeInput.id, userId);

    const updated = await this.prisma.theme.update({
      where: {
        id: updateThemeInput.id,
        userId: userId,
      },
      data: {
        title: updateThemeInput.title || theme.title,
      },
    });

    return updated;
  }

  async delete(ids: string[], userId: string) {
    const deleted = await this.prisma.theme.deleteMany({
      where: {
        userId,
        id: {
          in: ids.join(' ').split(' '),
        },
      },
    });

    return deleted.count;
  }
}

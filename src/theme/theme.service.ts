import { Injectable } from '@nestjs/common';
import { CreateThemeInput } from './dto/create-theme.input';
import { UpdateThemeInput } from './dto/update-theme.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ThemeService {
  constructor(private prisma: PrismaService) {}

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
    });

    if (!theme) {
      throw new Error('Theme not found');
    }
    return theme;
  }

  async update(id: string, updateThemeInput: UpdateThemeInput) {
    const theme = await this.findOne(id, updateThemeInput.userId);

    const updated = await this.prisma.theme.update({
      where: {
        id,
        userId: theme.userId,
      },
      data: {
        title: updateThemeInput.title,
      },
    });

    return updated;
  }

  async remove(ids: string[], userId: string) {
    const deleted = await this.prisma.theme.deleteMany({
      where: {
        userId,
        id: {
          in: ids,
        },
      },
    });

    return deleted;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateThemeInput } from './dto/create-theme.input';
import { UpdateThemeInput } from './dto/update-theme.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ThemeService {
  constructor(private prisma: PrismaService) {}

  async create(createThemeInput: CreateThemeInput) {
    const themes = await this.findAll(createThemeInput.userId);

    const themeTitle =
      (await themes.length) > 0 ? `Untitled-${themes.length}` : 'Untitled';

    const newTheme = await this.prisma.theme.create({
      data: {
        title: themeTitle,
        user: {
          connect: {
            id: createThemeInput.userId,
          },
        },
      },
    });

    return newTheme;
  }

  async findAll(userId: string) {
    return await this.prisma.theme.findMany({
      where: {
        userId,
      },
    });
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
    return `This action updates a #${id} theme`;
  }

  async remove(id: string) {
    return `This action removes a #${id} theme`;
  }
}

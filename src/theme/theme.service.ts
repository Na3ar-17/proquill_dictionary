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
      (await themes.length) > 0 ? `Untitled ${themes.length}` : 'Untitled';

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

  async findOne(id: number) {
    return `This action returns a #${id} theme`;
  }

  async update(id: number, updateThemeInput: UpdateThemeInput) {
    return `This action updates a #${id} theme`;
  }

  async remove(id: number) {
    return `This action removes a #${id} theme`;
  }
}

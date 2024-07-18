import { Injectable } from '@nestjs/common';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async create(createContentInput: CreateContentInput) {
    const newContent = await this.prisma.content.create({
      data: {
        sentence: createContentInput.sentence,
        translation: createContentInput.translation,
        exampleSentences: createContentInput.exampleSentences || [],
        transcription: createContentInput.transcription || '',
        theme: {
          connect: {
            id: createContentInput.themeId,
          },
        },
      },
    });

    return newContent;
  }

  async findAll(themeId: string, userId: string) {
    return await this.prisma.content.findMany({
      where: {
        theme: {
          userId,
          id: themeId,
        },
      },
    });
  }

  async findOne(id: string) {
    const content = await this.prisma.content.findUnique({
      where: {
        id,
      },
    });

    if (!content) throw new Error('Content not found');

    return content;
  }

  async update(id: string, updateContentInput: UpdateContentInput) {
    return `This action updates a #${id} content`;
  }

  async delete(id: string) {
    return `This action removes a #${id} content`;
  }
}

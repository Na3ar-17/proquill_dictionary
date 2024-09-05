import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';

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

  async getLength(themeId: string, userId: string) {
    return await this.prisma.content.count({
      where: {
        theme: {
          id: themeId,
          userId,
        },
      },
    });
  }

  async findAll(
    themeId: string,
    userId: string,
    where?: Prisma.ContentWhereInput,
  ) {
    return await this.prisma.content.findMany({
      where: {
        theme: {
          userId,
          id: themeId,
        },
        ...where,
      },
    });
  }

  async findOne(id: string, themeId: string) {
    const content = await this.prisma.content.findUnique({
      where: {
        id,
        themeId,
      },
    });

    if (!content) throw new Error('Content not found');

    return content;
  }

  async update(updateContentInput: UpdateContentInput) {
    const content = await this.findOne(
      updateContentInput.id,
      updateContentInput.themeId,
    );

    const updated = await this.prisma.content.update({
      where: {
        id: updateContentInput.id,
        theme: {
          id: content.themeId,
        },
      },
      data: {
        exampleSentences:
          updateContentInput.exampleSentences || content.exampleSentences,
        sentence: updateContentInput.sentence || content.sentence,
        transcription:
          updateContentInput.transcription || content.transcription,
        translation: updateContentInput.translation || content.translation,
        imageUrl: updateContentInput.imageUrl || content.imageUrl,
        hasLearned: updateContentInput.hasLearned || content.hasLearned,
        lernedCounts: updateContentInput.lernedCounts || content.lernedCounts,
      },
    });

    return updated;
  }

  async delete(id: string, themeId: string) {
    const deleted = await this.prisma.content.delete({
      where: {
        themeId,
        id,
      },
    });

    return deleted;
  }

  async deleteMany(ids: string[], themeId: string) {
    const deleted = await this.prisma.content.deleteMany({
      where: {
        themeId,
        id: {
          in: ids.join(' ').split(' '),
        },
      },
    });

    return deleted.count;
  }
}

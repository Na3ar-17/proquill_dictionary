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

  async update(updateContentInput: UpdateContentInput) {
    const content = await this.findOne(updateContentInput.id);

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
      },
    });

    return updated;
  }

  async delete(id: string) {
    return `This action removes a #${id} content`;
  }
}

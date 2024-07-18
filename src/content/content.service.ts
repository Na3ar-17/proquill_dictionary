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

  async findAll() {
    return `This action returns all content`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  async update(id: number, updateContentInput: UpdateContentInput) {
    return `This action updates a #${id} content`;
  }

  async delete(id: number) {
    return `This action removes a #${id} content`;
  }
}

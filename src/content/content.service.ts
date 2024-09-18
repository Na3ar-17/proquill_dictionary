import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { hasDuplicates } from 'src/utils/hasDuplicates';
import {
  CreateContentDto,
  CreateManyContentDto,
} from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async create(createContentDto: CreateContentDto) {
    if (
      await this.isDataExists(
        createContentDto.themeId,
        [createContentDto.sentence],
        [createContentDto.translation],
      )
    ) {
      throw new Error('Elements already exists');
    }

    const newContent = await this.prisma.content.create({
      data: {
        sentence: createContentDto.sentence,
        translation: createContentDto.translation,
        exampleSentences: createContentDto.exampleSentences || [],
        transcription: createContentDto.transcription || '',
        theme: {
          connect: {
            id: createContentDto.themeId,
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
    select?: Prisma.ContentSelect<DefaultArgs>,
  ) {
    return await this.prisma.content.findMany({
      where: {
        theme: {
          userId,
          id: themeId,
        },
        ...where,
      },
      select,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(
    id: string,
    themeId: string,
    select?: Prisma.ContentSelect<DefaultArgs>,
  ) {
    const content = await this.prisma.content.findUnique({
      where: {
        id,
        themeId,
      },
      select,
    });

    if (!content) throw new Error('Content not found');

    return content;
  }

  async update(updateContentDto: UpdateContentDto) {
    const content = await this.findOne(
      updateContentDto.id,
      updateContentDto.themeId,
    );

    const updated = await this.prisma.content.update({
      where: {
        id: updateContentDto.id,
        theme: {
          id: content.themeId,
        },
      },
      data: {
        exampleSentences:
          updateContentDto.exampleSentences || content.exampleSentences,
        sentence: updateContentDto.sentence || content.sentence,
        transcription: updateContentDto.transcription || content.transcription,
        translation: updateContentDto.translation || content.translation,
        imageUrl: updateContentDto.imageUrl || content.imageUrl,
        hasLearned: updateContentDto.hasLearned || content.hasLearned,
        lernedCounts: updateContentDto.lernedCounts || content.lernedCounts,
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

  async createMany(dto: CreateManyContentDto) {
    const sentences = dto.data.map((el) => el.sentence);
    const translations = dto.data.map((el) => el.translation);

    // const existedData = await this.prisma.content.count({
    //   where: {
    //     themeId: dto.themeId,
    //     OR: [
    //       {
    //         sentence: {
    //           in: sentences,
    //         },
    //       },
    //       {
    //         translation: {
    //           in: translations,
    //         },
    //       },
    //     ],
    //   },
    // });

    if (await this.isDataExists(dto.themeId, sentences, translations)) {
      throw new Error('The elements must be uniq');
    }

    if (hasDuplicates(translations) || hasDuplicates(sentences)) {
      throw new Error('The elements must be uniq');
    }

    const data = await dto.data.map((el) => {
      return { ...el, themeId: dto.themeId };
    });

    const res = await this.prisma.content.createMany({
      data,
    });

    return res.count;
  }
  async isDataExists(
    themeId: string,
    sentences: string[],
    translations: string[],
  ) {
    const existedData = await this.prisma.content.count({
      where: {
        themeId: themeId,
        OR: [
          {
            sentence: {
              in: sentences,
            },
          },
          {
            translation: {
              in: translations,
            },
          },
        ],
      },
    });

    return existedData >= 1;
  }
}

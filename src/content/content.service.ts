import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import {
  SelectTrueTranslation,
  Variations,
} from './entities/select-true-translation.enity';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}
  repeatedContentsId = new Set();

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

  async getForSelectTrueTranslation(themeId: string, userId: string) {
    const contents = await this.prisma.content.findMany({
      where: {
        theme: {
          id: themeId,
          userId,
        },
        hasLearned: false,
      },
      select: {
        id: true,
        sentence: true,
        translation: true,
        themeId: true,
      },
    });

    let randomContent;

    do {
      if (this.repeatedContentsId.size === contents.length) {
        return this.emptyResponse(themeId);
      }
      randomContent = contents[this.generateRandomIndex(contents.length)];
    } while (this.repeatedContentsId.has(randomContent.id));

    this.repeatedContentsId.add(randomContent.id);
    const variations = await this.getRandomTranslations(randomContent.id);
    variations.push({ translation: randomContent.translation });

    const response: SelectTrueTranslation = {
      id: randomContent.id,
      itemsLeft: contents.length - this.repeatedContentsId.size,
      sentence: randomContent.sentence,
      themeId: randomContent.themeId,
      variations: this.shuffleArray(variations),
    };

    return response.itemsLeft === 0 ? this.emptyResponse(themeId) : response;
  }

  private async getRandomTranslations(exeptId: string): Promise<Variations[]> {
    const contents = await this.prisma.content.findMany({
      where: {
        NOT: {
          id: exeptId,
        },
      },
      select: {
        translation: true,
        id: true,
      },
    });

    const uniqueTranslations = new Set<string>();
    while (uniqueTranslations.size < 2) {
      const randomIndex = this.generateRandomIndex(contents.length);
      uniqueTranslations.add(contents[randomIndex].translation);
    }

    return Array.from(uniqueTranslations).map((translation) => ({
      translation,
    }));
  }

  private generateRandomIndex(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private emptyResponse(themeId: string): SelectTrueTranslation {
    return {
      id: '',
      itemsLeft: 0,
      sentence: '',
      themeId,
      variations: [],
    };
  }
}

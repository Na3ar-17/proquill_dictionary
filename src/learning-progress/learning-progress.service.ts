import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLearningProgressDto } from './dto/create-learning-progress.dto';
import { UpdateLearningProgressDto } from './dto/update-learning-progress.dto';

@Injectable()
export class LearningProgressService {
  constructor(private prisma: PrismaService) {}

  async create(createLearningProgressDto: CreateLearningProgressDto) {
    const newLearningProgress = await this.prisma.learningProgress.create({
      data: {
        user: {
          connect: {
            id: createLearningProgressDto.userId,
          },
        },
        theme: {
          connect: {
            id: createLearningProgressDto.themeId,
          },
        },
      },
    });

    return newLearningProgress;
  }

  async findOne(themeId: string, userId: string) {
    const learningProgress = await this.prisma.learningProgress.findUnique({
      where: {
        themeId,
        userId,
      },
    });

    if (!learningProgress) {
      throw new Error('Not found');
    }

    return learningProgress;
  }

  async update(
    updateLearningProgressDto: UpdateLearningProgressDto,
    userId: string,
  ) {
    const { themeId, ...rest } = updateLearningProgressDto;

    const learningProgress = await this.findOne(
      updateLearningProgressDto.themeId,
      userId,
    );

    const updated = await this.prisma.learningProgress.update({
      where: {
        themeId: learningProgress.themeId,
        userId: learningProgress.userId,
      },
      data: {
        ...rest,
      },
    });

    return updated;
  }
}

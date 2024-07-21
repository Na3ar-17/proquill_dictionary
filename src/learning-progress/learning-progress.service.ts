import { Injectable } from '@nestjs/common';
import { CreateLearningProgressInput } from './dto/create-learning-progress.input';
import { UpdateLearningProgressInput } from './dto/update-learning-progress.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LearningProgressService {
  constructor(private prisma: PrismaService) {}

  async create(createLearningProgressInput: CreateLearningProgressInput) {
    const newLearningProgress = await this.prisma.learningProgress.create({
      data: {
        user: {
          connect: {
            id: createLearningProgressInput.userId,
          },
        },
        theme: {
          connect: {
            id: createLearningProgressInput.themeId,
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

  async update(updateLearningProgressInput: UpdateLearningProgressInput) {
    const { themeId, userId, ...rest } = updateLearningProgressInput;

    const learningProgress = await this.findOne(
      updateLearningProgressInput.themeId,
      updateLearningProgressInput.userId,
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

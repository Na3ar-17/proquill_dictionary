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

  findAll() {
    return `This action returns all learningProgress`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} learningProgress`;
  }

  async update(
    id: number,
    updateLearningProgressInput: UpdateLearningProgressInput,
  ) {
    return `This action updates a #${id} learningProgress`;
  }
}

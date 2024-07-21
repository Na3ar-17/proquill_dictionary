import { Module } from '@nestjs/common';
import { LearningProgressService } from './learning-progress.service';
import { LearningProgressResolver } from './learning-progress.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LearningProgressResolver, LearningProgressService, PrismaService],
  exports: [LearningProgressService],
})
export class LearningProgressModule {}

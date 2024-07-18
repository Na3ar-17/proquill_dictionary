import { Module } from '@nestjs/common';
import { LearningProgressService } from './learning-progress.service';
import { LearningProgressResolver } from './learning-progress.resolver';

@Module({
  providers: [LearningProgressResolver, LearningProgressService],
})
export class LearningProgressModule {}

import { Module } from '@nestjs/common';
import { LearningProgressModule } from 'src/learning-progress/learning-progress.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizModule } from 'src/quiz/quiz.module';
import { ThemeResolver } from './theme.resolver';
import { ThemeService } from './theme.service';

@Module({
  providers: [ThemeResolver, ThemeService, PrismaService],
  imports: [LearningProgressModule, QuizModule],
})
export class ThemeModule {}

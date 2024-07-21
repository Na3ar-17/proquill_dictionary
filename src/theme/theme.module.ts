import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeResolver } from './theme.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { LearningProgressModule } from 'src/learning-progress/learning-progress.module';

@Module({
  providers: [ThemeResolver, ThemeService, PrismaService],
  imports: [LearningProgressModule],
})
export class ThemeModule {}

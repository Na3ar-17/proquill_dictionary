import { Module } from '@nestjs/common';
import { ContentService } from 'src/content/content.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';

@Module({
  providers: [QuizResolver, QuizService, PrismaService, ContentService],
  exports: [QuizService],
})
export class QuizModule {}

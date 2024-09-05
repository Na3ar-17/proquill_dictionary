import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { QuizResolver } from './quiz.resolver'
import { QuizService } from './quiz.service'

@Module({
  providers: [QuizResolver, QuizService,PrismaService],
})
export class QuizModule {}

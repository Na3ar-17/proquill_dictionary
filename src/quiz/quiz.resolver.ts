import { Resolver } from '@nestjs/graphql';
import { QuizService } from './quiz.service';

@Resolver()
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}
}

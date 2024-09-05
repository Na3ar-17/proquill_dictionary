import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz, QuizSession } from './entitys/quiz.entiti';
import { QuizService } from './quiz.service';

@Resolver()
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}

  @Query(() => QuizSession, { name: 'variations' })
  @Auth()
  async getVariations(
    @Args('themeId') themeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.quizService.getVariations(themeId, userId);
  }

  @Mutation(() => Quiz, { name: 'create_quiz' })
  @Auth()
  async create(
    @Args('createQuizDto') createQuizDto: CreateQuizDto,
    @CurrentUser('id') userId: string,
  ) {
    return await this.quizService.create(createQuizDto, userId);
  }
}

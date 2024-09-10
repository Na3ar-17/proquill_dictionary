import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ValidateQuizDto } from './dto/validate-quiz.dto';
import { QuizSession, Result, ValidationResult } from './entities/quiz.entiti';
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

  @Query(() => Result, { name: 'result' })
  @Auth()
  async getResult(
    @Args('themeId') themeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.quizService.getResult(themeId, userId);
  }

  @Mutation(() => Boolean, { name: 'restart' })
  @Auth()
  async restart(
    @Args('themeId') themeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.quizService.restart(themeId, userId);
  }

  @Mutation(() => ValidationResult, { name: 'validate' })
  @Auth()
  async validate(
    @Args('validateQuizDto') validateQuizDto: ValidateQuizDto,
    @CurrentUser('id') userId: string,
  ) {
    return await this.quizService.validate(validateQuizDto, userId);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LearningProgressService } from './learning-progress.service';
import { LearningProgress } from './entities/learning-progress.entity';
import { UpdateLearningProgressInput } from './dto/update-learning-progress.input';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Resolver(() => LearningProgress)
export class LearningProgressResolver {
  constructor(
    private readonly learningProgressService: LearningProgressService,
  ) {}

  @Query(() => LearningProgress, { name: 'getLearningProgress' })
  @Auth()
  async findOne(
    @CurrentUser('id') userId: string,
    @Args('themeId') themeId: string,
  ) {
    return await this.learningProgressService.findOne(themeId, userId);
  }
}

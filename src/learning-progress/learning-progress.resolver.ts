import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateLearningProgressInput } from './dto/update-learning-progress.dto';
import { LearningProgress } from './entities/learning-progress.entity';
import { LearningProgressService } from './learning-progress.service';

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

  @Mutation(() => LearningProgress, { name: 'updateLearningProgress' })
  @Auth()
  async update(
    @Args('updateLearningProgressInput')
    updateLearningProgressInput: UpdateLearningProgressInput,
    @CurrentUser('id') userId: string,
  ) {
    return await this.learningProgressService.update(
      updateLearningProgressInput,
      userId,
    );
  }
}

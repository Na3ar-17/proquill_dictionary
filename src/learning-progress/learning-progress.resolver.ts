import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LearningProgressService } from './learning-progress.service';
import { LearningProgress } from './entities/learning-progress.entity';
import { CreateLearningProgressInput } from './dto/create-learning-progress.input';
import { UpdateLearningProgressInput } from './dto/update-learning-progress.input';

@Resolver(() => LearningProgress)
export class LearningProgressResolver {
  constructor(private readonly learningProgressService: LearningProgressService) {}

  @Mutation(() => LearningProgress)
  createLearningProgress(@Args('createLearningProgressInput') createLearningProgressInput: CreateLearningProgressInput) {
    return this.learningProgressService.create(createLearningProgressInput);
  }

  @Query(() => [LearningProgress], { name: 'learningProgress' })
  findAll() {
    return this.learningProgressService.findAll();
  }

  @Query(() => LearningProgress, { name: 'learningProgress' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.learningProgressService.findOne(id);
  }

  @Mutation(() => LearningProgress)
  updateLearningProgress(@Args('updateLearningProgressInput') updateLearningProgressInput: UpdateLearningProgressInput) {
    return this.learningProgressService.update(updateLearningProgressInput.id, updateLearningProgressInput);
  }

  @Mutation(() => LearningProgress)
  removeLearningProgress(@Args('id', { type: () => Int }) id: number) {
    return this.learningProgressService.remove(id);
  }
}

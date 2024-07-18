import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LearningProgressService } from './learning-progress.service';
import { LearningProgress } from './entities/learning-progress.entity';
import { CreateLearningProgressInput } from './dto/create-learning-progress.input';
import { UpdateLearningProgressInput } from './dto/update-learning-progress.input';

@Resolver(() => LearningProgress)
export class LearningProgressResolver {
  constructor(
    private readonly learningProgressService: LearningProgressService,
  ) {}
}

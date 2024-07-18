import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContentService } from './content.service';
import { Content } from './entities/content.entity';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Mutation(() => Content, { name: 'createContent' })
  async create(
    @Args('createContentInput') createContentInput: CreateContentInput,
  ) {
    return await this.contentService.create(createContentInput);
  }
}

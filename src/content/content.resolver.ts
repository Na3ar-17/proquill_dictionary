import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContentService } from './content.service';
import { Content } from './entities/content.entity';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Mutation(() => Content, { name: 'createContent' })
  @UsePipes(new ValidationPipe())
  @Auth()
  async create(
    @Args('createContentInput') createContentInput: CreateContentInput,
  ) {
    return await this.contentService.create(createContentInput);
  }

  @Query(() => [Content], { name: 'getAllContent' })
  @Auth()
  async findAll(
    @Args('themeId') themeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.contentService.findAll(themeId, userId);
  }
}

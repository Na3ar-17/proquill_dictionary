import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ContentService } from './content.service';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { Content } from './entities/content.entity';

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
  @Query(() => Int, { name: 'getContentLength' })
  @Auth()
  async getLength(
    @Args('themeId') themeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.contentService.getLength(themeId, userId);
  }

  @Query(() => Content, { name: 'getOneContent' })
  @Auth()
  async findOne(@Args('themeId') themeId: string, @Args('id') id: string) {
    return await this.contentService.findOne(id, themeId);
  }

  @Mutation(() => Content, { name: 'updateContent' })
  @UsePipes(new ValidationPipe())
  @Auth()
  async update(
    @Args('updateContentInput') updateContentInput: UpdateContentInput,
  ) {
    return await this.contentService.update(updateContentInput);
  }

  @Mutation(() => Int, { name: 'deleteManyContent' })
  @Auth()
  async deleteMany(
    @Args({ name: 'ids', type: () => [String] }) ids: string[],
    @Args('themeId') themeId: string,
  ) {
    return await this.contentService.deleteMany(ids, themeId);
  }

  @Mutation(() => Content, { name: 'deleteContent' })
  @Auth()
  async delete(@Args('id') id: string, @Args('themeId') themeId: string) {
    return await this.contentService.delete(id, themeId);
  }
}

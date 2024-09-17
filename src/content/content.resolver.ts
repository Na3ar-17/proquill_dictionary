import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ContentService } from './content.service';

import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Mutation(() => Content, { name: 'new_content' })
  @UsePipes(new ValidationPipe())
  @Auth()
  async create(@Args('createContentDto') createContentDto: CreateContentDto) {
    return await this.contentService.create(createContentDto);
  }

  @Mutation(() => Int, { name: 'new_contents' })
  @UsePipes(new ValidationPipe())
  @Auth()
  async createMany(
    @Args({ name: 'createManyContentDto', type: () => [CreateContentDto] })
    createContentDto: CreateContentDto[],
  ) {
    return await this.contentService.createMany(createContentDto);
  }

  @Query(() => [Content], { name: 'contents' })
  @Auth()
  async findAll(
    @Args('themeId') themeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.contentService.findAll(themeId, userId);
  }
  @Query(() => Int, { name: 'content_length' })
  @Auth()
  async getLength(
    @Args('themeId') themeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return await this.contentService.getLength(themeId, userId);
  }

  @Query(() => Content, { name: 'content' })
  @Auth()
  async findOne(@Args('themeId') themeId: string, @Args('id') id: string) {
    return await this.contentService.findOne(id, themeId);
  }

  @Mutation(() => Content, { name: 'update_content' })
  @UsePipes(new ValidationPipe())
  @Auth()
  async update(@Args('updateContentDto') updateContentDto: UpdateContentDto) {
    return await this.contentService.update(updateContentDto);
  }

  @Mutation(() => Int, { name: 'delete_many_content' })
  @Auth()
  async deleteMany(
    @Args({ name: 'ids', type: () => [String] }) ids: string[],
    @Args('themeId') themeId: string,
  ) {
    return await this.contentService.deleteMany(ids, themeId);
  }

  @Mutation(() => Content, { name: 'delete_content' })
  @Auth()
  async delete(@Args('id') id: string, @Args('themeId') themeId: string) {
    return await this.contentService.delete(id, themeId);
  }
}

import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { Theme } from './entities/theme.entity';
import { ThemeService } from './theme.service';

@Resolver(() => Theme)
export class ThemeResolver {
  constructor(private readonly themeService: ThemeService) {}

  @Mutation(() => Theme, { name: 'new_theme' })
  @Auth()
  async create(@CurrentUser('id') userId: string) {
    return await this.themeService.create(userId);
  }

  @Query(() => [Theme], { name: 'themes' })
  @Auth()
  async findAll(@CurrentUser('id') userId: string) {
    return await this.themeService.findAll(userId);
  }

  @Query(() => Theme, { name: 'theme' })
  @Auth()
  @UsePipes(new ValidationPipe())
  async findOne(@Args('id') id: string, @CurrentUser('id') userId: string) {
    return await this.themeService.findOne(id, userId);
  }

  @Mutation(() => Theme, { name: 'update_theme' })
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(
    @CurrentUser('id') userId: string,
    @Args('updateThemeDto') updateThemeDto: UpdateThemeDto,
  ) {
    return await this.themeService.update(updateThemeDto, userId);
  }

  @Mutation(() => Int, { name: 'delete_one_or_more_theme' })
  @Auth()
  async delete(
    @Args({ name: 'ids', type: () => [String] }) ids: string[],
    @CurrentUser('id') userId: string,
  ) {
    return await this.themeService.delete(ids, userId);
  }
}

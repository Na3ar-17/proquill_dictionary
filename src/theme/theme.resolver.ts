import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateThemeInput } from './dto/update-theme.input';
import { Theme } from './entities/theme.entity';
import { ThemeService } from './theme.service';

@Resolver(() => Theme)
export class ThemeResolver {
  constructor(private readonly themeService: ThemeService) {}

  @Mutation(() => Theme, { name: 'createTheme' })
  @Auth()
  async create(@CurrentUser('id') userId: string) {
    return await this.themeService.create(userId);
  }

  @Query(() => [Theme], { name: 'getAllThemes' })
  @Auth()
  async findAll(@CurrentUser('id') userId: string) {
    return await this.themeService.findAll(userId);
  }

  @Query(() => Theme, { name: 'getOneTheme' })
  @Auth()
  @UsePipes(new ValidationPipe())
  async findOne(@Args('id') id: string, @CurrentUser('id') userId: string) {
    return await this.themeService.findOne(id, userId);
  }

  @Mutation(() => Theme, { name: 'updateTheme' })
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(
    @CurrentUser('id') userId: string,
    @Args('updateThemeInput') updateThemeInput: UpdateThemeInput,
  ) {
    return await this.themeService.update(updateThemeInput, userId);
  }

  @Mutation(() => Int, { name: 'deleteOneOrMoreTheme' })
  @Auth()
  async delete(
    @Args({ name: 'ids', type: () => [String] }) ids: string[],
    @CurrentUser('id') userId: string,
  ) {
    return await this.themeService.delete(ids, userId);
  }
}

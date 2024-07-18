import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ThemeService } from './theme.service';
import { Theme } from './entities/theme.entity';
import { CreateThemeInput } from './dto/create-theme.input';
import { UpdateThemeInput } from './dto/update-theme.input';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UsePipes, ValidationPipe } from '@nestjs/common';

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
}

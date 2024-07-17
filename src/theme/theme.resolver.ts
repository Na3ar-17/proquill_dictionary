import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ThemeService } from './theme.service';
import { Theme } from './entities/theme.entity';
import { CreateThemeInput } from './dto/create-theme.input';
import { UpdateThemeInput } from './dto/update-theme.input';

@Resolver(() => Theme)
export class ThemeResolver {
  constructor(private readonly themeService: ThemeService) {}

  @Mutation(() => Theme)
  createTheme(@Args('createThemeInput') createThemeInput: CreateThemeInput) {
    return this.themeService.create(createThemeInput);
  }

  @Query(() => [Theme], { name: 'theme' })
  findAll() {
    return this.themeService.findAll();
  }

  @Query(() => Theme, { name: 'theme' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.themeService.findOne(id);
  }

  @Mutation(() => Theme)
  updateTheme(@Args('updateThemeInput') updateThemeInput: UpdateThemeInput) {
    return this.themeService.update(updateThemeInput.id, updateThemeInput);
  }

  @Mutation(() => Theme)
  removeTheme(@Args('id', { type: () => Int }) id: number) {
    return this.themeService.remove(id);
  }
}

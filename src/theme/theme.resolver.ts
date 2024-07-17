import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ThemeService } from './theme.service';
import { Theme } from './entities/theme.entity';
import { CreateThemeInput } from './dto/create-theme.input';
import { UpdateThemeInput } from './dto/update-theme.input';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Resolver(() => Theme)
export class ThemeResolver {
  constructor(private readonly themeService: ThemeService) {}

  @Mutation(() => Theme)
  // @UsePipes(new ValidationPipe())
  @Auth()
  async create(@Args('createThemeInput') createThemeInput: CreateThemeInput) {
    return await this.themeService.create(createThemeInput);
  }
}

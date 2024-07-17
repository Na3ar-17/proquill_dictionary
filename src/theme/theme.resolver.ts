import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ThemeService } from './theme.service';
import { Theme } from './entities/theme.entity';
import { CreateThemeInput } from './dto/create-theme.input';
import { UpdateThemeInput } from './dto/update-theme.input';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Resolver(() => Theme)
export class ThemeResolver {
  constructor(private readonly themeService: ThemeService) {}

  @Mutation(() => Theme, { name: 'createTheme' })
  // @UsePipes(new ValidationPipe())
  @Auth()
  async create(@CurrentUser('id') userId: string) {
    return await this.themeService.create(userId);
  }

  @Query(() => [Theme], { name: 'getAllThemes' })
  @Auth()
  async findAll(@CurrentUser('id') userId: string) {
    return await this.themeService.findAll(userId);
  }
}

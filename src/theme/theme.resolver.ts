import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ThemeService } from './theme.service';
import { Theme } from './entities/theme.entity';
import { CreateThemeInput } from './dto/create-theme.input';
import { UpdateThemeInput } from './dto/update-theme.input';

@Resolver(() => Theme)
export class ThemeResolver {
  constructor(private readonly themeService: ThemeService) {}
}

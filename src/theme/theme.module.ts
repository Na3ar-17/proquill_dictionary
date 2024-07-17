import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeResolver } from './theme.resolver';

@Module({
  providers: [ThemeResolver, ThemeService],
})
export class ThemeModule {}

import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeResolver } from './theme.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ThemeResolver, ThemeService, PrismaService],
})
export class ThemeModule {}

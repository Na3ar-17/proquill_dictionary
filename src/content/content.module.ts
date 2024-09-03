import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentResolver } from './content.resolver';
import { ContentService } from './content.service';
import { StudyService } from './study.service';

@Module({
  providers: [ContentResolver, ContentService, PrismaService, StudyService],
})
export class ContentModule {}

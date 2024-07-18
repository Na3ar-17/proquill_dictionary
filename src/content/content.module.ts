import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ContentResolver, ContentService, PrismaService],
})
export class ContentModule {}

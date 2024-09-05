import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentResolver } from './content.resolver';
import { ContentService } from './content.service';

@Module({
  providers: [ContentResolver, ContentService, PrismaService],
})
export class ContentModule {}

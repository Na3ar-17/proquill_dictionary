import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';

@Module({
  providers: [ContentResolver, ContentService],
})
export class ContentModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TmpModule } from './tmp/tmp.module';

@Module({
  imports: [TmpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

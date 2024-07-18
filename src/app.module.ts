import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ThemeModule } from './theme/theme.module';
import { ContentModule } from './content/content.module';
import { LearningProgressModule } from './learning-progress/learning-progress.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    UserModule,
    ConfigModule.forRoot(),
    AuthModule,
    ThemeModule,
    ContentModule,
    LearningProgressModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

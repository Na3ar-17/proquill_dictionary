import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { LearningProgressModule } from './learning-progress/learning-progress.module';
import { PrismaService } from './prisma/prisma.service';
import { QuizModule } from './quiz/quiz.module';
import { ThemeModule } from './theme/theme.module';
import { UserModule } from './user/user.module';
const ENV = process.env.NODE_ENV;
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
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env.development.local' : `.env.${ENV}.local`,
    }),
    AuthModule,
    ThemeModule,
    ContentModule,
    LearningProgressModule,
    QuizModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

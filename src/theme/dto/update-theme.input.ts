import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateThemeInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  @MinLength(3, { message: 'Title is too short' })
  @IsOptional()
  title?: string;
}

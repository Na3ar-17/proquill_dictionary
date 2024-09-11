import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MinLength } from 'class-validator';

@InputType()
export class UpdateThemeDto {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  @MinLength(3, { message: 'Title is too short' })
  @IsOptional()
  title?: string;
}

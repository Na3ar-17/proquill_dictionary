import { CreateThemeInput } from './create-theme.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateThemeInput extends PartialType(CreateThemeInput) {}

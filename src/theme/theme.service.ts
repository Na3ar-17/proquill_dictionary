import { Injectable } from '@nestjs/common';
import { CreateThemeInput } from './dto/create-theme.input';
import { UpdateThemeInput } from './dto/update-theme.input';

@Injectable()
export class ThemeService {
  create(createThemeInput: CreateThemeInput) {
    return 'This action adds a new theme';
  }

  findAll() {
    return `This action returns all theme`;
  }

  findOne(id: number) {
    return `This action returns a #${id} theme`;
  }

  update(id: number, updateThemeInput: UpdateThemeInput) {
    return `This action updates a #${id} theme`;
  }

  remove(id: number) {
    return `This action removes a #${id} theme`;
  }
}

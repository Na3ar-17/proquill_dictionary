import { Injectable } from '@nestjs/common';
import { CreateLearningProgressInput } from './dto/create-learning-progress.input';
import { UpdateLearningProgressInput } from './dto/update-learning-progress.input';

@Injectable()
export class LearningProgressService {
  create(createLearningProgressInput: CreateLearningProgressInput) {
    return 'This action adds a new learningProgress';
  }

  findAll() {
    return `This action returns all learningProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learningProgress`;
  }

  update(id: number, updateLearningProgressInput: UpdateLearningProgressInput) {
    return `This action updates a #${id} learningProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} learningProgress`;
  }
}

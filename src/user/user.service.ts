import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserInput: CreateUserInput) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {}

  remove(id: string) {}
}

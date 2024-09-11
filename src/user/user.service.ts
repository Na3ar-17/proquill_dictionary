import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        themes: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(dto: CreateUserDto) {
    const user = {
      email: dto.email,
      fullName: dto.fullName,
      password: await hash(dto.password),
    };

    const newUser = await this.prisma.user.create({
      data: user,
    });

    return newUser;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.getById(id);

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        fullName: dto.fullName,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });

    return updated;
  }
}

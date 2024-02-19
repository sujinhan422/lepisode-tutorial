import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { LoginDTO } from './dtos/login.dto';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('회원이 없습니다.');

    return user;
  }

  async create(data: LoginDTO) {
    return this.prismaService.user.create({
      data: { ...data, password: hashSync(data.password) },
    });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { LoginDTO } from './dtos/login.dto';
import { compareSync, hashSync } from 'bcryptjs';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('회원이 없습니다.');

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('회원이 없습니다.');

    return user;
  }

  async login(body: LoginDTO) {
    const { email, password } = body;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user)
      throw new BadRequestException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );

    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    return user;
  }

  async create(data: LoginDTO): Promise<User> {
    return this.prismaService.user.create({
      data: { ...data, password: hashSync(data.password) },
    });
  }
}

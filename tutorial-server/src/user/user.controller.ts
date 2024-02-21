import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDTO } from './dtos/create-user.dto';
import { LoginDTO } from './dtos/login.dto';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    const user = await this.userService.findById(id);
    return plainToInstance(UserDTO, user);
  }

  @Post()
  async create(@Body() body: CreateUserDTO) {
    const user = await this.userService.create(body);

    return plainToInstance(UserDTO, user);
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    const user = await this.userService.login(body);

    return plainToInstance(UserDTO, user);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO } from './dtos/login.dto';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    return plainToInstance(UserDTO, user);
  }

  @Post()
  async helloPost(@Body() body: LoginDTO) {
    const user = await this.userService.create(body);

    return plainToInstance(UserDTO, user);
  }
}

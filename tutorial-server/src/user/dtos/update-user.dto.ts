import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({ example: '홍길동' })
  @IsOptional()
  name: string;
}

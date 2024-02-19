import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class LoginDTO {
    @ApiProperty({example: 'ganghun@lepisode.leam'})
    @IsNotEmpty({message: '이메일을 입력해 주세요'})
    email: string;

    @ApiProperty({example: 'verysecretpassword'})
    @IsNotEmpty({message: '비밀번호를 입력해 주세요'})
    password: string;
    
    @ApiProperty({example: '홍길동'})
    @IsOptional()
    name?: string;
}

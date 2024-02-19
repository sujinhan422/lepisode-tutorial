import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PrismaModule } from './prisma/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
  providers: [PrismaService],
})
export class AppModule {}

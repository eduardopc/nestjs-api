import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository], // para deixar os métodos visíveis a outros módulos
})
export class DatabaseModule {}

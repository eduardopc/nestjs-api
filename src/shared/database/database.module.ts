import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CategoriesRepository],
  exports: [UsersRepository, CategoriesRepository], // para deixar os métodos visíveis a outros módulos
})
export class DatabaseModule {}

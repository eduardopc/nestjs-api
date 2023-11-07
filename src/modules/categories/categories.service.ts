import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  getCategoriesByUserId(userId: string) {
    return this.categoriesRepo.findAll({
      where: { userId },
    });
  }
}

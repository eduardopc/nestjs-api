import { Injectable } from '@nestjs/common';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { UserCanMakeOperationService } from '../bank-accounts/services/user-can-make-operation.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnership: UserCanMakeOperationService,
    private readonly validateCategoryOwnership: ValidateCategoryOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { name, type, date, value, bankAccountId, categoryId } =
      createTransactionDto;

    await this.validateOperation(userId, bankAccountId, categoryId);

    return this.transactionsRepo.create({
      data: {
        userId,
        date,
        value,
        bankAccountId,
        categoryId,
        name,
        type,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepo.findMany({
      where: { userId },
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  private async validateOperation(
    userId: string,
    bankAccountId: string,
    categoryId: string,
  ) {
    await Promise.all([
      this.validateBankAccountOwnership.validate(bankAccountId, userId),
      this.validateCategoryOwnership.validate(categoryId, userId),
    ]);
  }
}

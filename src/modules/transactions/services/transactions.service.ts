import { Injectable } from '@nestjs/common';

import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { UserCanMakeOperationService } from '../../bank-accounts/services/user-can-make-operation.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnership: UserCanMakeOperationService,
    private readonly validateCategoryOwnership: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnership: ValidateTransactionOwnershipService,
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

  findAllByUserId(userId: string, filters: { month: number; year: number }) {
    return this.transactionsRepo.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;

    await this.validateOperation(
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    );

    return this.transactionsRepo.update({
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
      where: { id: transactionId },
    });
  }

  async deleteTransactionById(userId: string, transactionId: string) {
    await this.validateOperation(userId, undefined, undefined, transactionId);

    await this.transactionsRepo.delete({ where: { id: transactionId } });

    return null;
  }

  private async validateOperation(
    userId: string,
    bankAccountId?: string,
    categoryId?: string,
    transactionId?: string,
  ) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnership.validate(transactionId, userId),
      bankAccountId &&
        this.validateBankAccountOwnership.validate(bankAccountId, userId),
      categoryId && this.validateCategoryOwnership.validate(categoryId, userId),
    ]);
  }
}

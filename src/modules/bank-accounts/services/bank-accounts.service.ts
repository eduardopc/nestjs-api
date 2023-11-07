import { Injectable } from '@nestjs/common';

import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { UserCanMakeOperationService } from './user-can-make-operation-service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly userCanMakeOperation: UserCanMakeOperationService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto;

    return this.bankAccountsRepo.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepo.findMany({
      where: { userId },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const { color, initialBalance, name, type } = updateBankAccountDto;

    await this.userCanMakeOperation.validate(bankAccountId, userId);

    return this.bankAccountsRepo.update({
      data: {
        color,
        initialBalance,
        name,
        type,
      },
      where: { id: bankAccountId },
    });
  }

  async deleteBankAccountById(userId: string, bankAccountId: string) {
    await this.userCanMakeOperation.validate(bankAccountId, userId);

    await this.bankAccountsRepo.delete({ where: { id: bankAccountId } });

    return null;
  }
}

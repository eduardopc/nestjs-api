import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class UserCanMakeOperationService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) {}

  async validate(bankAccountId: string, userId: string) {
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: { id: bankAccountId, userId },
    });

    if (!isOwner) throw new NotFoundException('Bank Account not found!');
  }
}

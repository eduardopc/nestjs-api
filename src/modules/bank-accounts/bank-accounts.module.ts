import { Module } from '@nestjs/common';

import { BankAccountsController } from './bank-accounts.controller';
import { BankAccountsService } from './services/bank-accounts.service';
import { UserCanMakeOperationService } from './services/user-can-make-operation.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, UserCanMakeOperationService],
  exports: [UserCanMakeOperationService],
})
export class BankAccountsModule {}

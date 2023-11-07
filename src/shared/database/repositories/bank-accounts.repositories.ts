import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createDto);
  }

  findMany(findManyDto: Prisma.BankAccountFindManyArgs) {
    return this.prismaService.bankAccount.findMany(findManyDto);
  }

  findFirst(findFirst: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(findFirst);
  }

  update(updateDto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(updateDto);
  }

  delete(removeDto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(removeDto);
  }
}

import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionSchema } from './schemas/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }])
  ],
  providers: [TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule {}

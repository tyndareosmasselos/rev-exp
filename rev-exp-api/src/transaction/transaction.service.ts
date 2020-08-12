import { Injectable } from '@nestjs/common';
import { Transaction } from './schemas/transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDTO } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
    constructor(@InjectModel('Transaction') private readonly transactionModel: Model<Transaction>) { }

    // fetch all transactions
    async getAllTransactions(minDate: number, maxDate: number): Promise<Transaction[]> {
        console.log(minDate, maxDate);
        const transactions = await this.transactionModel
            .find({
                "created": {
                    $gte: minDate,
                    $lte: maxDate
                }
            })
            .exec();
        return transactions;
    }

    // Get a single transaction
    async getTransaction(transactionID): Promise<Transaction> {
        const transaction = await this.transactionModel.findById(transactionID).exec();
        return transaction;
    }

    // post a single transaction
    async addTransaction(createCategoryDTO: CreateTransactionDTO): Promise<Transaction> {
        const newTransaction = await new this.transactionModel(createCategoryDTO);
        return newTransaction.save();
    }

    // Edit transaction details
    async updateTransaction(transactionID, createCategoryDTO: CreateTransactionDTO): Promise<Transaction> {
        const updatedTransaction = await this.transactionModel
            .findByIdAndUpdate(transactionID, createCategoryDTO, { new: true });
        return updatedTransaction;
    }

    // Delete a transaction
    async deleteTransaction(transactionID): Promise<any> {
        const deletedTransaction = await this.transactionModel.findByIdAndRemove(transactionID);
        return deletedTransaction;
    }
}

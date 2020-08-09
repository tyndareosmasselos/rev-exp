import { Controller, Get, Res, HttpStatus, NotFoundException, Param, Body, Put, Post, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService) { }

    // Retrieve transaction list
    @Get('')
    async getAllTransactions(@Res() res) {
        const transactions = await this.transactionService.getAllTransactions();
        return res.status(HttpStatus.OK).json(transactions);
    }

    // Fetch a particular transaction using ID
    @Get(':transactionID')
    async getTransaction(@Res() res, @Param('transactionID') transactionID) {
        const transaction = await this.transactionService.getTransaction(transactionID);
        if (!transaction) throw new NotFoundException('Category does not exist!');
        return res.status(HttpStatus.OK).json(transaction);
    }

    // add a transaction
    @Post('')
    async addTransaction(@Res() res, @Body() createTransactionDTO: CreateTransactionDTO) {
        const transaction = await this.transactionService.addTransaction(createTransactionDTO);
        return res.status(HttpStatus.OK).json({
            type: "success",
            message: "Transaction has been created successfully",
            payload: {
                transaction
            }
        })
    }

    @Put(':transactionID')
    async updateTransaction(@Res() res, @Param('transactionID') transactionID, @Body() CreateTransactionDTO: CreateTransactionDTO) {
        const transaction = await this.transactionService.updateTransaction(transactionID, CreateTransactionDTO);
        if (!transaction) throw new NotFoundException('Transaction does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Transaction has been successfully updated',
            payload: {
                transaction
            }
        });
    }

    // Delete a transaction
    @Delete(':transactionID')
    async deleteTransaction(@Res() res, @Param('transactionID') transactionID) {
        const transaction = await this.transactionService.deleteTransaction(transactionID);
        if (!transaction) throw new NotFoundException('Transaction does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Transaction has been deleted',
            payload: {
                transaction
            }
        })
    }
}

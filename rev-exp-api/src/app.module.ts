import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

// libs
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    // connect to database
    MongooseModule.forRoot('mongodb+srv://tyndareosmasselos:tyndareos@cluster0-xtwcq.mongodb.net/rev-exp?retryWrites=true&w=majority', { useNewUrlParser: true }),
    CategoryModule,
    TransactionModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// libs
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    // connect to database
    MongooseModule.forRoot('mongodb+srv://tyndareosmasselos:tyndareos@cluster0-xtwcq.mongodb.net/rev-exp?retryWrites=true&w=majority', { useNewUrlParser: true }),
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

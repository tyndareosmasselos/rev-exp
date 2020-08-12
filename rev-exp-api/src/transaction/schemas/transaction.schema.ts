import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop()
  name: string;

  @Prop()
  amount: number;

  @Prop()
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }

  @Prop()
  created: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

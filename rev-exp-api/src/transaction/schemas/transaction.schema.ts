import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop()
  name: string;

  @Prop()
  amount: number;

  @Prop()
  categoryID: string;

  @Prop()
  created: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

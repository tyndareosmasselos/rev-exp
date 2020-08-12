import { Document } from 'mongoose';

export interface Transaction extends Document {
    readonly name: string;
    readonly amount: number;
    readonly category_id: any;
    readonly created: number;
}
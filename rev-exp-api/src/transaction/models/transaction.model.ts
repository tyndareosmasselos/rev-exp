import { Document } from 'mongoose';

export interface Transaction extends Document {
    readonly name: string;
    readonly amount: number;
    readonly categoryID: string;
    readonly created: number;
}
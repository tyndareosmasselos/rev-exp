import { Document } from 'mongoose';

export interface Transaction extends Document {
    readonly name: string;
    readonly categoryID: string;
    readonly created: number;
}
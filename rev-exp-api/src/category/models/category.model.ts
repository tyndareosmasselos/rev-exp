import { Document } from 'mongoose';

export interface Category extends Document {
    readonly type: string;
    readonly name: string;
}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/caregory.schema';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    // fetch all categories
    async getAllCategories(): Promise<Category[]> {
        const categories = await this.categoryModel.find().exec();
        return categories;
    }

    // Get a single category
    async getCategory(categoryID): Promise<Category> {
        const category = await this.categoryModel.findById(categoryID).exec();
        return category;
    }

    // post a single category
    async addCategory(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const newCategory = await new this.categoryModel(createCategoryDTO);
        return newCategory.save();
    }

    // Edit category details
    async updateCategory(categoryID, createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const updatedCategory = await this.categoryModel
            .findByIdAndUpdate(categoryID, createCategoryDTO, { new: true });
        return updatedCategory;
    }

    // Delete a category
    async deleteCategory(categoryID): Promise<any> {
        const deletedCategory = await this.categoryModel.findByIdAndRemove(categoryID);
        return deletedCategory;
    }
}

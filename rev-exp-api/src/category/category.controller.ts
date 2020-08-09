import { Controller, Post, Res, Body, HttpStatus, Get, NotFoundException, Param, Put, Query, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    // Retrieve categories list
    @Get('')
    async getAllCategories(@Res() res) {
        const customers = await this.categoryService.getAllCategories();
        return res.status(HttpStatus.OK).json(customers);
    }

    // Fetch a particular customer using ID
    @Get(':categoryID')
    async getCategory(@Res() res, @Param('categoryID') categoryID) {
        const customer = await this.categoryService.getCategory(categoryID);
        if (!customer) throw new NotFoundException('Category does not exist!');
        return res.status(HttpStatus.OK).json(customer);
    }

    // add a category
    @Post('')
    async addCategory(@Res() res, @Body() createCategoryDTO: CreateCategoryDTO) {
        const category = await this.categoryService.addCategory(createCategoryDTO);
        return res.status(HttpStatus.OK).json({
            type: "success",
            message: "Category has been created successfully",
            payload: {
                category
            }
        })
    }

    @Put(':categoryID')
    async updateCategory(@Res() res, @Param('categoryID') categoryID, @Body() createCategoryDTO: CreateCategoryDTO) {
        const category = await this.categoryService.updateCategory(categoryID, createCategoryDTO);
        if (!category) throw new NotFoundException('Cateogry does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Category has been successfully updated',
            payload: {
                category
            }
        });
    }

    // Delete a category
    @Delete(':categoryID')
    async deleteCategory(@Res() res, @Param('categoryID') categoryID) {
        const category = await this.categoryService.deleteCategory(categoryID);
        if (!category) throw new NotFoundException('Category does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Category has been deleted',
            payload: {
                category
            }
        })
    }
}

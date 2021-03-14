import { CreateCategoryDto } from '../dto/create-category.dto';
import {Category} from '../entities/category.entity'

export interface ICategoriesRepository {
    create(createCategoryDto: CreateCategoryDto): Promise<Category>,
    findAll(): Promise<Category[]>
    // findOne():,
    // update(),
    // remove()
}